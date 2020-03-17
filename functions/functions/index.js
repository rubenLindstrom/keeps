const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

app.use(cors());

// Middleware
const auth = require("./middleware/auth");

// === HANDLERS ===
const { register, login, validateToken } = require("./handlers/auth");
const {
  getNotes,
  addNote,
  updateNote,
  deleteNote
} = require("./handlers/notes");

// Auth
app.post("/register", register);
app.post("/login", login);
app.post("/validateToken", validateToken);

// Notes
app.get("/notes", auth, getNotes);
app.post("/notes", auth, addNote);
app.patch("/notes/:noteId", auth, updateNote);
app.delete("/notes/:noteId", auth, deleteNote);

exports.api = functions.region("europe-west2").https.onRequest(app);
