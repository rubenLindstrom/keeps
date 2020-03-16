import React, { useState, useContext, useEffect } from "react";
import RichTextEditor from "react-rte";

import context from "../context";

import EditorView from "../components/editor";

const EditorContainer = () => {
  const { selectedNote, loading } = useContext(context);
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  useEffect(() => {
    if (selectedNote)
      setValue(RichTextEditor.createValueFromString(selectedNote.body, "html"));
  }, [selectedNote]);

  const handleValueChange = newValue => {
    setValue(newValue);
  };

  return (
    <EditorView
      loading={loading}
      noNotes={!Boolean(selectedNote)}
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default EditorContainer;
