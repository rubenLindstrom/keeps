import React, { useState, useEffect, createContext } from "react";
import RichTextEditor from "react-rte";

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
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );
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
    if (selectedNote)
      setEditorValue(
        RichTextEditor.createValueFromString(notes[selectedNote].body, "html")
      );
  }, [selectedNote]);

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
    const currentSelectedId = selectedNote;
    const newNotes = { ...notes };
    newNotes[currentSelectedId].body = editorValue.toString("html");

    saveNote(currentSelectedId);
    setNotes(newNotes);
    setSelectedNote(id);
  };

  const saveNote = id => {
    doUpdateNote(id, { body: editorValue.toString("html") });
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
        editorValue,
        setEditorValue,
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
