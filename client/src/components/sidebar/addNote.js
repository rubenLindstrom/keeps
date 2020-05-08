import React, { useContext, useRef, useState } from "react";

import NoteContext from "../../contexts/noteContext";
import { isEnterKey } from "../../helpers";
import { COLORS } from "../../constants";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import Modal from "../modal";
import { SpinnerButton } from "../atoms";

const AddNoteContainer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const { addNote, errors, clearErrors } = useContext(NoteContext);

  const handleKeyPress = (e) => {
    if (isEnterKey(e)) handleSubmit();
  };

  const handleSubmit = () => {
    setLoading(true);
    addNote(title)
      .then((success) => success && handleClose())
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    clearErrors();
    setTitle("");
    setOpen(false);
  };

  return (
    <AddNoteView
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onKeyPress={handleKeyPress}
      error={errors.add}
      loading={loading}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  button: { backgroundColor: COLORS.GREEN, color: "#fff" },
}));

const AddNoteView = ({
  value,
  onChange,
  open,
  onOpen,
  onClose,
  onSubmit,
  onKeyPress,
  error,
  loading,
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
        loading={loading}
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
          value={value}
          onChange={onChange}
          autoFocus
          error={error && true}
          helperText={error}
          onKeyPress={onKeyPress}
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
        Add Note
      </Button>
    </>
  );
};

export default AddNoteContainer;
