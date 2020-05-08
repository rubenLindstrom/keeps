import React, { useContext, useRef, useState } from "react";

import NoteContext from "../../contexts/noteContext";
import { isEnterKey } from "../../helpers";
import { COLORS } from "../../constants";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
  button: { backgroundColor: COLORS.GREEN, color: "#fff" },
}));

const AddNoteView = ({
  open,
  onOpen,
  onClose,
  onSubmit,
  inputRef,
  onKeyPress,
  error,
}) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        open={open}
        title="Add Note"
        onClose={onClose}
        onAffirmative={onSubmit}
        affirmativeText="Add"
        text={
          <>
            Enter a title for your new note
            <br />{" "}
            <span style={{ fontSize: "0.8em" }}>
              For instance:
              <em> Shopping list, Movies to watch,</em> or
              <em> Favourite animals</em>!
            </span>
          </>
        }
      >
        <TextField
          autoFocus
          error={error && true}
          helperText={error}
          onKeyPress={onKeyPress}
          inputRef={inputRef}
          fullWidth
          label="Title"
          placeholder="My new awesome note"
        />
      </Modal>
      <Button
        onClick={onOpen}
        fullWidth
        variant="contained"
        className={classes.button}
      >
        Add note
      </Button>
    </>
  );
};

export default AddNoteContainer;
