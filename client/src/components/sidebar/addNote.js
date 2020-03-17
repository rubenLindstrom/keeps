import React, { useContext, useRef } from "react";
import context from "../../context";
import { isEmpty } from "../../helpers";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddNote = () => {
  const inputRef = useRef();
  const { addNote } = useContext(context);

  const doAddNote = e => {
    const title = inputRef.current.value;
    // TODO: Set error
    if (isEmpty(title)) return;
    addNote(title);
    inputRef.current.value = "";
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) doAddNote();
  };

  return (
    <div className="add-note">
      <TextField
        onKeyPress={handleKeyPress}
        inputRef={inputRef}
        fullWidth
        placeholder="Title"
      />
      <div>
        <Button onClick={doAddNote} fullWidth variant="contained">
          Add note
        </Button>
      </div>
    </div>
  );
};

export default AddNote;
