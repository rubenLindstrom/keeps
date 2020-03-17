const { db } = require("../util/firebase");

exports.getNotes = async (req, res) => {
  const notes = req.user.notes;

  const noteRefs = notes.map(id => db.doc(`/notes/${id}`));
  if (!noteRefs.length) return res.json({});
  db.getAll(...noteRefs).then(notes =>
    res.json(
      notes.reduce(
        (acc, note) => ({ [note.id]: { ...note.data(), id: note.id }, ...acc }),
        {}
      )
    )
  );
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
    owner: uid
  };

  // TODO: Promise.all
  let id;
  db.collection("/notes")
    .add(newNote)
    .then(note => {
      id = note.id;
      return db.doc(`/users/${uid}`).get();
    })
    .then(user =>
      user.ref.update({
        notes: [id, ...notes]
      })
    )
    .then(() => res.status(201).json({ ...newNote, id }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

exports.updateNote = (req, res) => {
  const note = req.body;
  const id = req.params.noteId;
  const { notes } = req.user;

  if (!notes.includes(id))
    return res.status(403).json({ message: "Unauthorized" });

  // TODO: Validate
  const newNote = { ...note, updatedAt: new Date().toISOString() };
  db.doc(`/notes/${id}`)
    .update(newNote)
    .then(() => res.json({ message: `${id} successfully updated!` }))
    .catch(error => res.status(500).json({ error }));
};

exports.deleteNote = (req, res) => {
  const id = req.params.noteId;
  const notes = req.user.notes;
  const uid = req.user.uid;

  // Validation
  if (!notes.includes(id))
    return res.status(403).json({ error: "Unauthorized" });

  db.doc(`/notes/${id}`).delete();
  db.doc(`/users/${uid}`).update({
    notes: notes.filter(noteId => noteId !== id)
  });
  return res.json({ message: `${id} deleted!` });
};
