"use strict";

const path = require("path"); // helper library for resolving relative paths
const expressSession = require("express-session");
const socketIOSession = require("express-socket.io-session");
const express = require("express");
const http = require("http");
const cors = require("cors");

const publicPath = path.join(__dirname, "..", "..", "client", "dist");
const port = 8989;
const app = express();
const bodyParser = require("body-parser");

const httpServer = http.Server(app);
const io = require("socket.io").listen(httpServer); // Creates socket.io app

const db = require("./util/database");

app.use(
  express.json()
); /*
This is a middleware that parses the body of the request into a javascript object.
It's basically just replacing the body property like this:
req.body = JSON.parse(req.body)
*/
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Setup session
const session = expressSession({
  secret: "Super secret! Shh! Don't tell anyone...",
  resave: true,
  saveUninitialized: true
});
app.use(session);
io.use(
  socketIOSession(session, {
    autoSave: true,
    saveUninitialized: true
  })
);
// #endregion

// Serve client
app.use(express.static(publicPath));

// Start server
httpServer.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// Middleware
const auth = require("./middleware/auth");

// === HANDLERS ===
const { register, login, logout, validateToken } = require("./handlers/auth");
const { getNotes, addNote, updateNote } = require("./handlers/notes");

// Auth
app.post("/register", register);
app.post("/login", login);
app.post("/logout", auth, logout);
app.post("/validateToken", validateToken);

// TEST MIDDLEWARE
app.get("/auth", auth, (req, res) => res.json({ message: "Authenticated!" }));

// Notes
app.get("/notes", auth, getNotes);
app.post("/notes", auth, addNote);
app.put("/notes/:noteId", auth, updateNote);
