const admin = require("firebase-admin");
const functions = require("firebase-functions");
const adminConfig = require("./adminConfig.json");
const clientConfig = require("./clientConfig.js");
const client = require("firebase/app");
require("firebase/auth");

admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://keeps-81a16.firebaseio.com"
});
// admin.initializeApp(functions.config().firebase);

client.initializeApp(clientConfig);

module.exports = {
  admin,
  db: admin.firestore(),
  auth: client.auth()
};
