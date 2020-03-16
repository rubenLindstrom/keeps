import React, { useContext, useRef } from "react";
import context from "../../context";
import { isEmpty } from "../../helpers";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddNote = () => {
  const inputRef = useRef();
  const { addNote } = useContext(context);

  const handleClick = e => {
    const title = inputRef.current.value;
    // TODO: Set error
    if (isEmpty(title)) return;
    addNote(title);
  };

  return (
    <div className="add-note">
      <TextField inputRef={inputRef} fullWidth placeholder="Title" />
      <div>
        <Button onClick={handleClick} fullWidth variant="contained">
          Add note
        </Button>
      </div>
    </div>
  );
};

export default AddNote;
