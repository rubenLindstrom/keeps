import React, { useState, useEffect, createContext } from "react";

import {
  doLogin,
  doLogout,
  doRegister,
  doValidateToken,
  setToken,
  unsetToken
} from "../services";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // TODO: Implement error handling
    if (token) {
      doValidateToken(token)
        .then(() => {
          setToken(token);
          setAuthenticated(true);
        })
        .catch(() => {
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  const login = (email, password) =>
    doLogin(email, password).then(token => {
      if (token) {
        setToken(token);
        setAuthenticated(true);
      }
    });

  const register = (email, password, cPassword) =>
    doRegister(email, password, cPassword).then(token => {
      if (token) {
        setToken(token);
        setAuthenticated(true);
      }
    });

  const logout = () =>
    doLogout().then(() => {
      setAuthenticated(false);
      unsetToken();
    });

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
