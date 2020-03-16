const { User, Note } = require("../util/database");
const jwt = require("jsonwebtoken");
const secret = require("../util/secret");

// FUNKTION SOM KÖRS INNAN DEN FUNKTION VI ÅBEROPAT KÖRS
module.exports = async (req, res, next) => {
  console.log("IN MIDDLEWARE");

  // ====== 1. Kolla att token/cookie finns - om den finns hämta headers värde
  let idToken; // Token - denna skall decodas tillbaka till uid
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  // ====== 2. Verifiering - decoda token
  const decoded = jwt.verify(idToken, secret);

  jwt.verify(idToken, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    // ------ Add info to request
    req.userId = decoded.id;

    Note.destroy({
      where: {},
      truncate: true
    });
    // Get info about user from database - notes som tillhör användaren
    console.log("GETTING NOTES");
    // Note.findAll({
    //   limit: 10
    // });

    // Put needed info on the request object so that handlers can access it
    next();
    // TODO: Catch potential error
  });
};
