import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import AuthContext from "./authContext";
import RichTextEditor from "react-rte";
import { toast } from "react-toastify";

import {
  doGetNotes,
  doUpdateNote,
  doAddNote,
  doDeleteNote,
  doShare,
} from "../services";
import { isEmail, isEmpty, hasErrors, translateServerError } from "../helpers";

const NoteContext = createContext();

const SET_NOTES = "SET_NOTES";
const ADD_NOTE = "ADD_NOTE";
const SELECT_NOTE = "SELECT_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const SET_ERROR = "SET_ERROR";
const CLEAR_STATE = "CLEAR_STATE";

const noteReducer = (state, action) => {
  let newNotes;
  switch (action.type) {
    case SET_NOTES:
      return {
        errors: {},
        notes: action.payload,
        selectedNote: Object.keys(action.payload)[0],
        loading: false,
      };
    case ADD_NOTE:
      return {
        errors: {},
        notes: { [action.payload.id]: action.payload, ...state.notes },
        selectedNote: action.payload.id,
      };
    case SELECT_NOTE:
      newNotes = { ...state.notes };
      const newNote = { ...newNotes[state.selectedNote] };
      newNote.body = action.payload.editorValue.toString("html");
      newNotes[state.selectedNote] = newNote;
      return {
        errors: {},
        notes: newNotes,
        selectedNote: action.payload.id,
      };
    case DELETE_NOTE:
      const oldKeys = Object.keys(state.notes).reverse();
      const oldIndex = oldKeys.indexOf(state.selectedNote);
      const oldSelectedNote = state.selectedNote;
      const oldNotes = { ...state.notes };

      // 1. Ta bort delete:ad note
      const newKeys = oldKeys.filter((id) => id !== oldSelectedNote);
      newNotes = newKeys.reduce(
        (acc, key) => ({ [key]: { ...oldNotes[key] }, ...acc }),
        {}
      );

      // 2. Uppdatera selectedNote
      let newSelectedNote;
      if (newKeys.length === 0) newSelectedNote = null;
      else if (oldIndex > newKeys.length - 1)
        newSelectedNote = newKeys[newKeys.length - 1];
      else newSelectedNote = newKeys[oldIndex];

      return {
        errors: {},
        notes: newNotes,
        selectedNote: newSelectedNote,
      };

    case SET_ERROR:
      return { ...state, loading: false, errors: action.payload };

    case CLEAR_STATE:
      return {
        notes: null,
        selectedNote: null,
        loading: true,
        errors: {},
      };

    default:
      return state;
  }
};

// TODO: Make selectedNote and notes properties of the same object
const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, {
    selectedNote: null,
    errors: {},
    notes: null,
    loading: true,
  });
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const { user, authenticated } = useContext(AuthContext);
  const [shareLoading, setShareLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    if (state.selectedNote)
      setEditorValue(
        RichTextEditor.createValueFromString(
          state.notes[state.selectedNote].body,
          "html"
        )
      );
  }, [state.selectedNote]);

  useEffect(() => {
    if (authenticated) getNotes();
    else dispatch({ type: CLEAR_STATE });
  }, [authenticated]);

  // Notes
  const getNotes = () =>
    doGetNotes()
      .then((notes) =>
        dispatch({
          type: SET_NOTES,
          payload: notes,
        })
      )
      .catch((err) =>
        dispatch({
          type: SET_ERROR,
          // TODO: Translate error
          payload: translateServerError(err.response.data),
        })
      );

  const addNote = async (title) => {
    // Preventing double tap
    if (addLoading) return false;
    setAddLoading(true);
    if (isEmpty(title)) {
      dispatch({ type: SET_ERROR, payload: { add: "Title can't be empty" } });
      setAddLoading(false);
      return false;
    }

    return doAddNote(title)
      .then((newNote) => {
        dispatch({
          type: ADD_NOTE,
          payload: newNote,
        });
        toast.success(
          <span>
            <em>{title}</em> <strong>added!</strong>
          </span>
        );
        return true;
      })
      .catch((err) => {
        const error = { add: err.response.data.error };
        dispatch({
          type: SET_ERROR,
          payload: translateServerError(error),
        });
        return false;
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  const selectNote = (id) => {
    saveNote(state.selectedNote);
    dispatch({
      type: SELECT_NOTE,
      payload: { id, editorValue },
    });
  };

  const saveNote = (id) => {
    const body = editorValue.toString("html");
    if (state.notes[state.selectedNote].body !== body)
      doUpdateNote(id, { body })
        .then(() =>
          toast.info(
            <span>
              <em>{state.notes[state.selectedNote].title}</em>{" "}
              <strong> saved!</strong>
            </span>
          )
        )
        .catch(() => toast.warning("Could not save note!"));
  };

  const deleteNote = () => {
    if (state.selectedNote) {
      doDeleteNote(state.selectedNote);
      toast.error(
        <span>
          <em>{state.notes[state.selectedNote].title}</em>{" "}
          <strong>deleted!</strong>
        </span>
      );
      dispatch({ type: DELETE_NOTE });
    }
  };

  const shareNote = async (email) => {
    // Prevent double tap
    if (shareLoading) return false;
    setShareLoading(true);
    const validation = {};
    if (isEmpty(email)) validation.share = "Email can't be empty";
    else if (!isEmail(email)) validation.share = "Invalid email";
    else if (state.notes[state.selectedNote].owner !== user.uid)
      validation.share = "You don't have permission to share this note";

    if (hasErrors(validation)) {
      setShareLoading(false);
      dispatch({
        type: SET_ERROR,
        payload: validation,
      });
      return false;
    }

    return doShare(email, state.selectedNote)
      .then(() => {
        toast.success(
          <span>
            <em>{state.notes[state.selectedNote].title}</em> shared with {email}
            !
          </span>
        );
        return true;
      })
      .catch((err) => {
        const error = { share: err.response.data.error };
        dispatch({
          type: SET_ERROR,
          payload: translateServerError(error),
        });
        return false;
      })
      .finally(() => {
        setShareLoading(false);
      });
  };

  const clearErrors = () => dispatch({ type: SET_ERROR, payload: {} });

  // TODO: Split up into setter and getter state
  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        addNote,
        selectedNote: state.selectedNote
          ? state.notes[state.selectedNote]
          : null,
        selectNote,
        errors: state.errors,
        deleteNote,
        editorValue,
        setEditorValue,
        saveNote,
        loading: state.loading,
        shareNote,
        clearErrors,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
export { NoteProvider };
