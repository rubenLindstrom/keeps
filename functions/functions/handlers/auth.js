const { db, auth, admin } = require("../util/firebase");
const { isEmail } = require("../util/helpers");

exports.register = (req, res) => {
  const { email, password, cPassword } = req.body;

  if (!isEmail(email)) return res.status(400).json({ email: "Invalid email" });
  if (password !== cPassword)
    return res.status(400).json({ cPassword: "Passwords must match!" });

  let token, uid;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      uid = user.uid;
      return user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        email,
        uid,
        createdAt: new Date().toISOString(),
        notes: []
      };
      return db.doc(`/users/${uid}`).set(userCredentials);
    })
    .then(() => res.status(201).json({ token }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!isEmail(email)) return res.status(400).json({ error: "Invalid email" });

  // TODO: Validate
  auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => user.getIdToken())
    .then(token => res.json({ token }))
    .catch(error => res.status(403).json({ error }));
};

exports.validateToken = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(token)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(403).json({ error: err }));
};
