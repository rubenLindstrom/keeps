import React, { useContext } from "react";
import RichTextEditor from "react-rte";

import NoteContext from "../contexts/noteContext";

const EditorContainer = () => {
  const {
    selectedNote,
    loading,
    editorValue,
    setEditorValue,
    saveNote
  } = useContext(NoteContext);

  const handleKeyPress = e => {
    if (e.keyCode === 83 && e.ctrlKey) {
      e.preventDefault();
      saveNote(selectedNote.id);
    }
  };

  return (
    <div onKeyDown={handleKeyPress}>
      <EditorView
        loading={loading}
        noNotes={!Boolean(selectedNote)}
        value={editorValue}
        onChange={setEditorValue}
      />
    </div>
  );
};

const EditorView = ({ loading, value, onChange, noNotes }) => {
  if (loading) return <p className="big">Fetching notes...</p>;
  else if (noNotes) return <p className="big">You have no notes :(</p>;

  return (
    <RichTextEditor
      autoFocus
      value={value}
      onChange={onChange}
      placeholder="Start editing your note here..."
    />
  );
};

export default EditorContainer;
