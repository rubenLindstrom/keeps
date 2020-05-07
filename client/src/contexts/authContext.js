import React, { useState, useEffect, createContext } from "react";
import auth from "../firebaseAuth";
import {
  isEmpty,
  isEmail,
  translateClientError,
  translateServerError,
  hasErrors,
} from "../helpers";
import { errorMessages, PASSWORD_MIN_LENGTH } from "../constants";

import { doRegister, setToken, unsetToken } from "../services";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ email: user.email, uid: user.uid });
        auth.currentUser
          .getIdToken(true)
          .then((token) => {
            console.log(token);
            return token;
          })
          .then((token) => setToken(token))
          .then(() => setAuthenticated(true))
          .catch(() => setAuthenticated(false));
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    });
  }, []);

  const login = (email, password) => {
    const validation = {};
    if (isEmpty(email)) validation.email = errorMessages.mustNotBeEmpty;
    else if (!isEmail(email)) validation.email = errorMessages.invalidEmail;
    if (isEmpty(password)) validation.password = errorMessages.mustNotBeEmpty;
    else if (password.length < PASSWORD_MIN_LENGTH)
      validation.password = errorMessages.tooShort;

    if (hasErrors(validation).length)
      return setErrors(translateServerError(validation));

    setErrors({});
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((err) => {
        setErrors(translateClientError(err));
      })
      .finally(() => setLoading(false));
  };

  const register = (email, password, cPassword) => {
    const validation = {};
    if (isEmpty(email)) validation.email = errorMessages.mustNotBeEmpty;
    else if (!isEmail(email)) validation.email = errorMessages.invalidEmail;

    if (isEmpty(password)) validation.password = errorMessages.mustNotBeEmpty;
    else if (password.length < PASSWORD_MIN_LENGTH)
      validation.password = errorMessages.tooShort;

    if (isEmpty(cPassword)) validation.cPassword = errorMessages.mustNotBeEmpty;
    else if (cPassword !== password)
      validation.cPassword = errorMessages.mustMatch;

    if (hasErrors(validation).length)
      return setErrors(translateServerError(validation));

    setErrors({});
    setLoading(true);
    doRegister(email, password, cPassword)
      .then(() => login(email, password))
<<<<<<< HEAD
      .catch((err) => setErrors(translateServerError(err)))
=======
      .catch((err) => setErrors(translateServerError(err.response.data)))
>>>>>>> 13a2b19db191c72ac7590e97f8a15b5a2a1082fa
      .finally(() => setLoading(false));
  };

  const logout = () => {
    auth.signOut();
    unsetToken();
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        logout,
        register,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
