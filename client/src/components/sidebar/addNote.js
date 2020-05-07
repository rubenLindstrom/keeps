import React, { useContext, useRef, useState } from "react";
import NoteContext from "../../contexts/noteContext";
import { isEmpty, isEnterKey } from "../../helpers";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Modal from "../modal";

const AddNoteContainer = () => {
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const { addNote, errors, clearErrors } = useContext(NoteContext);

  const handleKeyPress = (e) => {
    if (isEnterKey(e)) handleSubmit();
  };

  const handleSubmit = () => {
    addNote(inputRef.current.value).then(handleClose);
  };

  const handleClose = () => {
    clearErrors();
    inputRef.current.value = "";
    setOpen(false);
  };

  return (
    <AddNoteView
      open={open}
      onOpen={() => setOpen(true)}
      onClose={handleClose}
      onSubmit={handleSubmit}
      inputRef={inputRef}
      onKeyPress={handleKeyPress}
      error={errors.add}
    />
  );
};

const AddNoteView = ({
  open,
  onOpen,
  onClose,
  onSubmit,
  inputRef,
  onKeyPress,
  error,
}) => (
  <>
    <Modal
      open={open}
      title="Add Note"
      onClose={onClose}
      onAffirmative={onSubmit}
      affirmativeText="Add"
      text="Enter a title for your new note"
    >
      <TextField
        autoFocus
        error={error && true}
        helperText={error}
        onKeyPress={onKeyPress}
        inputRef={inputRef}
        fullWidth
        label="Title"
        placeholder="Title"
      />
    </Modal>
    <Button onClick={onOpen} fullWidth variant="contained">
      Add note
    </Button>
  </>
);

export default AddNoteContainer;
