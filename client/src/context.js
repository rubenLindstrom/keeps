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
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const getNotes = () =>
    doGetNotes().then(res => {
      setLoading(false);
      setNotes(res.data);
      if (Object.keys(res.data).length)
        setSelectedNote(Object.values(res.data)[0]);
    });

  const addNote = title =>
    doAddNote(title).then(res => {
      setNotes(notes => ({ [res.data.id]: res.data, ...notes }));
    });

  const selectNote = id => {
    setSelectedNote(notes[id]);
  };

  return (
    <Context.Provider
      value={{
        authenticated,
        login,
        logout,
        register,
        notes,
        addNote,
        selectedNote,
        selectNote,
        loading
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { Provider };
