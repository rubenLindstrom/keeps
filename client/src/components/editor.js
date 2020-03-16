import React from "react";
import RichTextEditor from "react-rte";

const editorView = ({ loading, value, onChange, noNotes }) => {
  if (loading) return <p>Fetching notes...</p>;
  else if (noNotes) return <p>You have no notes :(</p>;

  return (
    <RichTextEditor
      autoFocus
      value={value}
      onChange={onChange}
      placeholder="Start editing your note here..."
    />
  );
};

export default editorView;
