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
import EditableText from "./editableText";

import CircularProgress from "@material-ui/core/CircularProgress";

const EditorContainer = () => {
  const {
    selectedNote,
    error,
    loading,
    editorValue,
    setEditorValue,
    saveNote,
    updateTitle,
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
        title={selectedNote && selectedNote.title}
        updateTitle={updateTitle}
      />
    </div>
  );
};

const Wrapper = styled.div`
  background: linear-gradient(to right bottom, #eff 25%, #eef);
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
    <img src={AddDocument} />
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
  title,
  updateTitle,
}) => {
  if (error || loading || noNotes) {
    let content;
    if (error) content = <ErrorMessage error={error.error} />;
    else if (loading)
      content = (
        <Wrapper>
          <CircularProgress size={70} />
        </Wrapper>
      );
    else content = <NoNotes />;
    return content;
  }

  return (
    <>
      <EditableText save={updateTitle}>{title}</EditableText>
      <RichTextEditor
        ref={inputRef}
        autoFocus
        value={value}
        onChange={onChange}
        placeholder="Start editing your note here..."
        onClick={onClick}
      />
    </>
  );
};

export default EditorContainer;
