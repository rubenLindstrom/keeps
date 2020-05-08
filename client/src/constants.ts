export const PASSWORD_MIN_LENGTH = 6;

export const COLORS = {
  GREEN: "#2ecc71",
  RED: "#e74c3c",
  BLUE: "#3498db",
};

const firebaseMessages = {
  emailNotFound: "auth/user-not-found",
};

export const errorMessages = {
  invalidEmail: "invalid-email",
  emailAlreadyTaken: "email-already-taken",
  mustNotBeEmpty: "must-not-be-empty",
  tooShort: "too-short",
  mustMatch: "must-match",
  unauthorized: "unauthorized",
  noteNotFound: "noteNotFound",
  userNotFound: "user-not-found",
  cannotShareWithSelf: "cannot-share-with-self",
  alreadyHasAccess: "already-has-access",
  ...firebaseMessages,
};

export const errorTranslations: { [key: string]: string } = {
  [errorMessages.invalidEmail]: "Invalid email",
  [errorMessages.emailAlreadyTaken]: "This email is already in use",
  [errorMessages.tooShort]: "Too short",
  [errorMessages.mustMatch]: "Passwords must match",
  [errorMessages.unauthorized]: "Unauthorized",
  [errorMessages.userNotFound]: "User not found",
  [errorMessages.noteNotFound]: "Note not found",
  [errorMessages.cannotShareWithSelf]: "You can't share a note with yourself",
  [errorMessages.alreadyHasAccess]: "User already has access to that note",
  [errorMessages.mustNotBeEmpty]: "Must not be empty",

  [firebaseMessages.emailNotFound]: "User not found",
};

export const FALLBACK_ERROR_MESSAGE: string = "Something went wrong";
