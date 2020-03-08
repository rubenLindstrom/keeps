const { db, auth } = require("../util/firebase");

exports.register = (req, res) => {
  const { email, password, cPassword, handle } = req.body;

  // TODO: Validate
  // Check that handle is unique
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
        handle,
        email,
        uid,
        createdAt: new Date().toISOString(),
        notes: []
      };
      return db.doc(`/users/${handle}`).set(userCredentials);
    })
    .then(() => res.status(201).json({ token }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // TODO: Validate
  auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => user.getIdToken())
    .then(token => res.json({ token }))
    .catch(error => res.status(403).json({ error }));
};
