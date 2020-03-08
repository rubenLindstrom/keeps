const { db } = require("../util/firebase");

exports.getNotes = async (req, res) => {
  const notes = req.user.notes;

  const noteRefs = notes.map(id => db.doc(`/notes/${id}`));
  if (!noteRefs.length) return res.json({ notes: {} });
  db.getAll(...noteRefs).then(notes => {
    res.json(
      notes.reduce((acc, note) => ({ [note.id]: note.data(), ...acc }), {})
    );
  });
};

exports.addNote = (req, res) => {
  const { title } = req.body;
  const { handle, notes } = req.user;

  // TODO: Validate
  const newNote = {
    title,
    body: "",
    createdAt: new Date().toISOString(),
    sharedWith: [],
    owner: handle
  };

  // TODO: Promise.all
  let id;
  db.collection("/notes")
    .add(newNote)
    .then(note => {
      id = note.id;
      return db.doc(`/users/${handle}`).get();
    })
    .then(user =>
      user.ref.update({
        notes: [id, ...notes]
      })
    )
    .then(() => res.status(201).json({ note: newNote, id }))
    .catch(error => res.json({ error }));
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
  const { handle, notes } = req.user;

  // Validation
  if (!notes.includes(id))
    return res.status(403).json({ error: "Unauthorized" });

  db.doc(`/notes/${id}`).delete();
  db.doc(`/users/${handle}`).update({
    notes: Object.keys(notes).reduce(
      (acc, key) => (key !== id ? { [key]: notes[key], ...acc } : acc),
      {}
    )
  });
  return res.json({ message: `${id} deleted!` });
};
