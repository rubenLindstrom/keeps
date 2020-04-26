const admin = require("firebase-admin");
const functions = require("firebase-functions");
const adminConfig = require("../admin.json");
const client = require("firebase/app");
require("firebase/auth");

admin.initializeApp({
	credential: admin.credential.cert(adminConfig),
	databaseURL: "https://keeps-81a16.firebaseio.com"
});
// admin.initializeApp(functions.config().firebase);

module.exports = {
	admin,
	auth: admin.auth(),
	db: admin.firestore()
};
