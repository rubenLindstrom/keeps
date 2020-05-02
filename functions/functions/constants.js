module.exports.MINIMUM_PASS_LENGTH = 6;

module.exports.errorMessages = {
	// General
	invalidEmail: "invalid-email",
	invalidPassword: "invalid-password",
	emailAlreadyTaken: "email-already-taken",
	tooShort: "too-short",
	mustNotBeEmpty: "must-not-be-empty",
	mustMatch: "must-match",
	unauthorized: "unauthorized",
	tokenExpired: "token-expired",

	// Users
	userNotFound: "user-not-found",

	// Notes
	noteNotFound: "noteNotFound",
	cannotShareWithSelf: "cannot-share-with-self",
	alreadyHasAccess: "already-has-access",

	fallback: "something-went-wrong"
};
