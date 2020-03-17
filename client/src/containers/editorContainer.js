import React, { useContext } from "react";

import context from "../context";

import EditorView from "../components/editor";

const EditorContainer = () => {
  const {
    selectedNote,
    loading,
    editorValue,
    setEditorValue,
    saveNote
  } = useContext(context);

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

export default EditorContainer;
