const { admin, auth, db } = require("../util/firebase");

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("uid", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      const { notes } = data.docs[0].data();
      req.user.notes = notes;
      // req.user.imageUrl = imageUrl;
      return next();
    })
    .catch(err => {
      console.error("Error while verifying token", err);
      return res.status(403).json({ error: err });
    });
};
