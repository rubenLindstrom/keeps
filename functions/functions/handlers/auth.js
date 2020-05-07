const { db, auth, admin } = require("../util/firebase");
const { isEmpty, isEmail, parseError, hasErrors } = require("../util/helpers");
const { MINIMUM_PASS_LENGTH, errorMessages } = require("../constants");

// TODO: Translate firebase errors
exports.register = (req, res) => {
  const { email, password, cPassword } = req.body;

  const errors = {};
  if (!isEmail(email)) errors.email = errorMessages.invalidEmail;
  if (isEmpty(password)) errors.password = errorMessages.mustNotBeEmpty;
  if (password.length < MINIMUM_PASS_LENGTH)
    errors.password = errorMessages.tooShort;
  if (password !== cPassword) errors.cPassword = erorrMessages.mustMatch;

  if (hasErrors(errors)) return res.status(400).json(errors);

  auth
    .createUser({ email, password })
    .then((userRecord) => {
      const uid = userRecord.uid;
      const userCredentials = {
        email,
        uid,
        createdAt: new Date().toISOString(),
        notes: [],
      };
      db.doc(`/users/${uid}`).set(userCredentials);
      return res.status(201).json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      console.log("THis is the error code: " + error.code);
      res.status(500).json({ error: parseError(error) });
    });
};

exports.validateToken = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(403).json({ error: errorMessages.unauthorized });
  }
  admin
    .auth()
    .verifyIdToken(token)
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error(err);
      res.status(403).json({ error: parseError(err) });
    });
};
