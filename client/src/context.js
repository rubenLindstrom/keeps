import React, { useState, useEffect, createContext } from "react";

import {
  doLogin,
  doLogout,
  doRegister,
  doGetNotes,
  doValidateToken,
  doAddNote,
  setToken,
  unsetToken
} from "./services";

const Context = createContext();

const Provider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // TODO: Implement error handling
    if (token) {
      doValidateToken(token)
        .then(() => {
          setToken(token);
          setAuthenticated(true);
        })
        .catch(() => setAuthenticated(false));
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) getNotes();
  }, [authenticated]);

  // Auth
  const login = (email, password) => {
    doLogin(email, password).then(res => {
      if (res.data.token) {
        setToken(res.data.token);
        setAuthenticated(true);
      }
    });
  };

  const register = (email, password, cPassword) => {
    doRegister(email, password, cPassword).then(res => {
      if (res.data.token) {
        setToken(res.data.token);
        setAuthenticated(true);
      }
    });
  };

  const logout = () => [
    doLogout().then(() => {
      setAuthenticated(false);
      unsetToken();
    })
  ];

  // Notes
  const getNotes = () => doGetNotes().then(res => setNotes(res.data));

  const addNote = title =>
    doAddNote(title).then(res => {
      setNotes(notes => ({ [res.data.id]: res.data, ...notes }));
    });

  return (
    <Context.Provider
      value={{ authenticated, login, logout, register, notes, addNote }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { Provider };
