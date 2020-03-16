const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

app.use(cors());

// Middleware
const auth = require("./middleware/auth");

// === HANDLERS ===
const { register, login, logout, validateToken } = require("./handlers/auth");
const { getNotes, addNote, updateNote } = require("./handlers/notes");

// Auth
app.post("/register", register);
app.post("/login", login);
app.post("/validateToken", validateToken);

// Notes
app.get("/notes", auth, getNotes);
app.post("/notes", auth, addNote);
app.put("/notes/:noteId", auth, updateNote);

exports.api = functions.region("europe-west2").https.onRequest(app);
