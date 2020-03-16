// REPRESENTS OUR "models.js" file

// ================================== RUBEN
// const { db } = require("../util/firebase");

// ---------------------------------- JENNIBOB
const { User, Note } = require("../util/database");

// ================================== RUBEN
// exports.getNotes = async (req, res) => {
//   const notes = req.user.notes;

//   const noteRefs = notes.map(id => db.doc(`/notes/${id}`));
//   if (!noteRefs.length) return res.json({ notes: {} });
//   db.getAll(...noteRefs).then(notes => {
//     res.json(
//       notes.reduce((acc, note) => ({ [note.id]: note.data(), ...acc }), {})
//     );
//   });
// };

// ---------------------------------- JENNIBOB
exports.getNotes = (req, res) => {
  console.log("IN GETNOTES");

  Note.findAll({
    limit: 30
  });
  // .then(notes => {
  //   console.log(notes);
  //   res.send({ error: false, message: "notes", data: notes });
  // })
  // .catch(err => {
  //   console.log("Oops! something went wrong, : ", err);
  // });
};

// RETURNERA: NOTE OBJEKT
exports.addNote = async (req, res) => {
  console.log("IN ADDNOTE");

  const title = req.body.title;
  const userId = req.userId;
  const body = "";

  const newNote = Note.build({
    title: title,
    body: body,
    owner: userId
  });

  await newNote
    .save()
    .then(() => res.status(201).json(newNote))
    .catch(error => res.json({ error }));
};

// ================================== RUBEN
// exports.updateNote = (req, res) => {
//   const note = req.body;
//   const id = req.params.noteId;
//   const { notes } = req.user;

//   if (!notes.includes(id))
//     return res.status(403).json({ message: "Unauthorized" });

//   // TODO: Validate
//   const newNote = { ...note, updatedAt: new Date().toISOString() };
//   db.doc(`/notes/${id}`)
//     .update(newNote)
//     .then(() => res.json({ message: `${id} successfully updated!` }))
//     .catch(error => res.status(500).json({ error }));
// };

// ---------------------------------- JENNIBOB
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

// ================================== RUBEN
// exports.deleteNote = (req, res) => {
//   const id = req.params.noteId;
//   const { handle, notes } = req.user;

//   // Validation
//   if (!notes.includes(id))
//     return res.status(403).json({ error: "Unauthorized" });

//   db.doc(`/notes/${id}`).delete();
//   db.doc(`/users/${handle}`).update({
//     notes: Object.keys(notes).reduce(
//       (acc, key) => (key !== id ? { [key]: notes[key], ...acc } : acc),
//       {}
//     )
//   });
//   return res.json({ message: `${id} deleted!` });
// };

// ---------------------------------- JENNIBOB
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
