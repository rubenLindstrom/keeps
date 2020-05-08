const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const nodemailer = require("nodemailer");

// TODO: Implement TS and testing
app.use(cors());

// Middleware
const auth = require("./middleware/auth");

// === HANDLERS ===
const { register, validateToken } = require("./handlers/auth");
const {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  shareNote,
} = require("./handlers/notes");

// Auth
app.post("/register", register);
app.post("/validateToken", validateToken);

// Notes
app.get("/notes", auth, getNotes);
app.post("/notes", auth, addNote);
app.patch("/notes/:noteId", auth, updateNote);
app.delete("/notes/:noteId", auth, deleteNote);
app.post("/notes/:noteId/share", auth, shareNote);

exports.api = functions.region("europe-west2").https.onRequest(app);

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const APP_NAME = "Keeps - Social Notetaking";

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  return sendWelcomeEmail(email);
});

exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  const email = user.email;
  return sendGoodbyeEmail(email);
});

async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@keeps.com>`,
    to: email,
  };

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text =
    "Hey! Thanks for registering your account at Keeps. We hope you'll enjoy the service, and be sure to share your notes with some friends!";
  await mailTransport.sendMail(mailOptions);
  console.log("New welcome email sent to:", email);
  return null;
}

async function sendGoodbyeEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@keeps.com>`,
    to: email,
  };

  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey! We confirm that we have deleted your ${APP_NAME} account.`;
  await mailTransport.sendMail(mailOptions);
  console.log("Account deletion confirmation email sent to:", email);
  return null;
}
