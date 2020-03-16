const { User, Note } = require("../util/database");
const { isEmail } = require("../util/helpers");
const { isPassword } = require("../util/helpers");
const jwt = require("jsonwebtoken");
const secret = require("../util/secret");

// TOKENS: HAR EN TOKEN, LÄGGS ENDAST TILL EN GÅNG, ANTINGEN I REGISTER ELLER LOGIN

exports.register = async (req, res) => {
  console.log("IN REGISTER");

  // ====== 1. EXTRAHERA DATA FRÅN REQUEST (POST)
  const { email, password, cPassword } = req.body;

  // ====== 2. VALIDERA DATA
  // ------ Username (email) måste vara giltig
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ email: "Bad request error: Not valid format of email" });
  }

  // ------ Password måste ha ett specifikt format
  if (!isPassword(password)) {
    return res
      .status(400)
      .json({ password: "Bad request error: Not valid format of password" });
  }

  // ------ cPassword måste matcha password
  if (cPassword !== password) {
    return res.status(400).json({
      cPassword: "Bad request error: cPassword does not match password"
    });
  }

  // ------ Användarnamn får inte vara upptaget
  const exist = await User.findOne({
    // Returnerar "null" om användare inte finns
    where: { email: email }
  });

  if (exist) {
    return res
      .status(409)
      .json({ error: "Conflict error: User already exist" });
  }

  // ====== 3. UTFÖR OPERATIONEN - REGISTRERA ANVÄNDAREN
  // ------ Creat a JWT string with a secret - token
  const token = jwt.sign({ id: User.uid }, secret, {
    expiresIn: 86400 // 24 hours
  });

  const newUser = User.build({ email, password, token }); // Generate temporary User object

  // Save temporary user in database
  await newUser
    .save()
    .then(() => res.status(201).json({ token }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

exports.login = async (req, res) => {
  console.log("IN LOGIN");

  const { email, password } = req.body;

  // ====== VALIDERA DATA
  // ------ Username (email) måste vara giltig
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ email: "Bad request error: Not valid format of email" });
  }

  // ------ Password måste ha ett specifikt format
  if (!isPassword(password)) {
    return res
      .status(400)
      .json({ password: "Bad request error: Not valid format of password" });
  }

  // ****** PRINT CONTENT OF TABLE
  // User.findAll({
  //   limit: 30
  // })
  //   .then(function(users)  {
  //     console.log(users);
  //     res.send({ error: false, message: "Users", data: users });
  //   })
  //   .catch(function(err) {
  //     console.log("Oops! something went wrong, : ", err);
  //   });
  // ******

  const user = await User.findOne({
    where: { email: email, password: password }
  });

  if (!user) {
    return res
      .status(401)
      .json({ error: "Not found error: The user does not exist" });
  }

  // ------ Creat a JWT string with a secret - token
  const token = jwt.sign({ id: user.uid }, secret, {
    expiresIn: 86400 // 24 hours
  });

  user.token = token;

  return res.json({ token });
};

// Remove user token
exports.logout = async (req, res) => {
  console.log("IN LOGOUT");

  // ====== Ta bort token för den user som har req.userId
  user = await User.findOne({
    where: {
      uid: req.userId
    }
  });

  user.token = undefined;

  return res.json({ success: true });
};

exports.validateToken = (req, res) => {
  const token = req.body.token;

  // ====== 1. Kolla om token ens finns
  if (!token) {
    return res
      .status(401)
      .json({ error: "Not found error: Token does not exist" });
  }

  // ====== 2. Validera token (så som i auth middleware)
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    res.json({ success: true });
  });
};
