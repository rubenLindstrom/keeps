import React, { useState, useEffect, createContext } from "react";

import {
  doLogin,
  doLogout,
  doRegister,
  doGetNotes,
  doUpdateNote,
  doValidateToken,
  doAddNote,
  doDeleteNote,
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
        .catch(() => {
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) getNotes();
  }, [authenticated]);

  // TODO: If note was added, select it
  useEffect(() => {
    if (notes && Object.keys(notes).length) {
      if (
        !selectedNote ||
        (selectedNote && !Object.keys(notes).includes(selectedNote))
      )
        setSelectedNote(Object.keys(notes)[0]);
    } else {
      setSelectedNote(null);
    }
    // eslint-disable-next-line
  }, [notes]);

  // Auth
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

  // Notes
  const getNotes = () =>
    doGetNotes().then(notes => {
      setLoading(false);
      setNotes(notes);
    });

  const addNote = title =>
    doAddNote(title).then(newNote => {
      setNotes(notes => ({ [newNote.id]: newNote, ...notes }));
    });

  const selectNote = id => {
    setSelectedNote(id);
  };

  const saveNote = body => {
    doUpdateNote(selectedNote, { body });
  };

  const deleteNote = () => {
    if (selectedNote) {
      doDeleteNote(selectedNote);
      setNotes(prevNotes =>
        Object.keys(prevNotes)
          .filter(id => id !== selectedNote)
          .reduce((acc, key) => ({ [key]: prevNotes[key], ...acc }), {})
      );
    }
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
        selectedNote: selectedNote ? notes[selectedNote] : null,
        selectNote,
        deleteNote,
        saveNote,
        saveNote,
        loading
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { Provider };
