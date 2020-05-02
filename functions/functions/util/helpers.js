const { errorMessages } = require("../constants");

exports.isEmpty = (str) => str.length === 0;

exports.isEmail = (email) =>
  email.match(
    //eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

// TODO: Complement with more Firebase errors
exports.parseError = (err) => {
  switch (err.message) {
    case "auth/user-not-found":
      return errorMessages.userNotFound;
    case "auth/email-already-exists":
      return errorMessages.emailAlreadyTaken;
    case "auth/id-token-expired":
      return errorMessages.tokenExpired;
    case "auth/invalid-password":
      return errorMessages.invalidPassword;
    default:
      return errorMessages.fallback;
  }
};
