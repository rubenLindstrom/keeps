import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import RichTextEditor from "react-rte";

import AddDocument from "../images/add_document.svg";
import CountingStars from "../images/counting_stars.svg";
import EmptyStreets from "../images/empty_streets.svg";
import QuietTown from "../images/quiet_town.svg";
import Warning from "../images/warning.svg";

import NoteContext from "../contexts/noteContext";

import AddNote from "./sidebar/addNote";
import { Error } from "./atoms";

const EditorContainer = () => {
  const {
    selectedNote,
    error,
    loading,
    editorValue,
    setEditorValue,
    saveNote,
  } = useContext(NoteContext);

  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.keyCode === 83 && e.ctrlKey) {
      e.preventDefault();
      saveNote(selectedNote.id);
    }
  };

  const focusEditor = () => {
    inputRef.current && inputRef.current._focus();
  };

  useEffect(() => {
    focusEditor();
  }, [selectedNote]);

  return (
    <div onKeyDown={handleKeyPress} className="editor">
      <EditorView
        error={error}
        loading={loading}
        noNotes={!Boolean(selectedNote)}
        value={editorValue}
        onChange={setEditorValue}
        inputRef={inputRef}
        onClick={focusEditor}
      />
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;

  img {
    width: 50%;
    max-width: 250px;
  }

  p {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 1.5rem;
  }

  span {
    width: 200px;
  }
`;

// AddDocument
// CountingStars
// EmptyStreets
// QuietTown

const NoNotes = () => (
  <Wrapper>
    <img src={CountingStars} />
    <p>You have no notes! How about we fix that?</p>
    <span>
      <AddNote />
    </span>
  </Wrapper>
);

const ErrorMessage = ({ error }) => (
  <Wrapper>
    <img src={Warning} />
    <Error>{error}</Error>
  </Wrapper>
);

const EditorView = ({
  loading,
  error,
  value,
  onChange,
  noNotes,
  inputRef,
  onClick,
}) => {
  if (error || loading || noNotes) {
    let content;
    if (error) content = <ErrorMessage error={error.error} />;
    // TODO: Insert spinner instead
    else if (loading) content = <p className="big">Fetching notes...</p>;
    else content = <NoNotes />;
    return <div style={{ padding: "1rem" }}>{content}</div>;
  }

  return (
    <RichTextEditor
      ref={inputRef}
      autoFocus
      value={value}
      onChange={onChange}
      placeholder="Start editing your note here..."
      onClick={onClick}
    />
  );
};

export default EditorContainer;
