const { db, auth, admin } = require("../util/firebase");
const { isEmail } = require("../util/helpers");
const { MINIMUM_PASS_LENGTH } = require("../constants");

exports.register = (req, res) => {
	const { email, password, cPassword } = req.body;

	const errors = {};
	if (!isEmail(email)) errors.email = "Invalid email";
	if (password.length < MINIMUM_PASS_LENGTH)
		errors.password = `Password must be at least ${MINIMUM_PASS_LENGTH} characters`;
	if (password !== cPassword) errors.cPassword = "Passwords must match";

	if (Object.keys(errors).length) return res.status(400).json(errors);

	auth.createUser({ email, password })
		.then((userRecord) => {
			const uid = userRecord.uid;
			const userCredentials = {
				email,
				uid,
				createdAt: new Date().toISOString(),
				notes: []
			};
			db.doc(`/users/${uid}`).set(userCredentials);
			return res.status(201).json({ success: true });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
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
		.catch((err) => res.status(403).json(err));
};
