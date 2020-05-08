const { db } = require("../util/firebase");
const { isEmail, parseError } = require("../util/helpers");
const { errorMessages } = require("../constants");

// TODO: Validation
exports.getNotes = async (req, res) => {
  const notes = req.user.notes;

  const noteRefs = notes.map((id) => db.doc(`/notes/${id}`));
  if (!noteRefs.length) return res.json({});
  db.getAll(...noteRefs)
    .then((notes) =>
      res.json(
        notes.reduce(
          (acc, note) => ({
            [note.id]: { ...note.data(), id: note.id },
            ...acc,
          }),
          {}
        )
      )
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: parseError(err) });
    });
};

exports.addNote = (req, res) => {
  const { title } = req.body;
  const { notes, uid } = req.user;

  // TODO: Validate
  const newNote = {
    title,
    body: "",
    createdAt: new Date().toISOString(),
    sharedWith: [],
    owner: uid,
  };

  let id;
  db.collection("/notes")
    .add(newNote)
    .then((note) => {
      id = note.id;
      return db.doc(`/users/${uid}`).get();
    })
    .then((user) =>
      user.ref.update({
        notes: [id, ...notes],
      })
    )
    .then(() => res.status(201).json({ ...newNote, id }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: parseError(error) });
    });
};

exports.updateNote = (req, res) => {
  const note = req.body;
  const id = req.params.noteId;
  const { notes } = req.user;

  if (!notes.includes(id))
    return res.status(403).json({ error: errorMessages.unauthorized });

  const newNote = { ...note, updatedAt: new Date().toISOString() };
  db.doc(`/notes/${id}`)
    .update(newNote)
    .then(() => res.json({ message: `${id} successfully updated!` }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: parseError(err) });
    });
};

exports.deleteNote = (req, res) => {
  const id = req.params.noteId;
  const notes = req.user.notes;
  const uid = req.user.uid;

  // Validation
  if (!notes.includes(id))
    return res.status(403).json({ error: errorMessages.unauthorized });

  db.doc(`/notes/${id}`).delete();
  db.doc(`/users/${uid}`).update({
    notes: notes.filter((noteId) => noteId !== id),
  });
  return res.status(204).json({ message: `${id} deleted!` });
};

exports.shareNote = (req, res) => {
  const uid = req.user.uid;
  const noteId = req.params.noteId;
  const shareWith = req.body.shareWith;

  if (!isEmail(shareWith))
    return res.status(400).json({ error: errorMessages.invalidEmail });

  Promise.all([
    db.collection("users").where("email", "==", shareWith).limit(1).get(),
    db.doc(`/notes/${noteId}`).get(),
  ]).then(([userDocs, noteDoc]) => {
    // If user does not exist
    if (!userDocs || !userDocs.docs.length)
      return res.status(404).json({ error: errorMessages.userNotFound });
    // If note does not exist
    if (!noteDoc.exists)
      return res.status(404).json({ error: errorMessages.noteNotFound });

    const note = noteDoc.data();
    const user = userDocs.docs[0].data();

    // If sharer does not own note
    if (note.owner !== uid)
      return res.status(403).json({ error: errorMessages.unauthorized });
    // If note is shared with owner
    if (note.owner === user.uid)
      return res.status(400).json({ error: errorMessages.cannotShareWithSelf });
    // If sharedWith already has access
    if (note.sharedWith.includes(user.uid))
      return res.status(400).json({ error: errorMessages.alreadyHasAccess });

    Promise.all([
      db.doc(`/notes/${noteId}`).update({
        sharedWith: [user.uid, ...note.sharedWith],
      }),
      db.doc(`/users/${user.uid}`).update({
        notes: [noteId, ...user.notes],
      }),
    ])
      .then(() => {
        return res.json({ success: true });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: parseError(err) });
      });
  });
};
