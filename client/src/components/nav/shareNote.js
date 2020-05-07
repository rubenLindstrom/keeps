import React, { useState, useRef, useContext } from "react";

import NoteContext from "../../contexts/noteContext";
import { isEnterKey } from "../../helpers";

import { StyledIcon } from "../atoms";
import Modal from "../modal";

// Mui
import TextField from "@material-ui/core/TextField";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

const ShareContainer = React.forwardRef(({ disabled }, ref) => {
  const { shareNote, errors, clearErrors } = useContext(NoteContext);
  const [open, setOpen] = useState(false);
  const inputRef = useRef();

  const handleSubmit = (_) => {
    shareNote(inputRef.current.value).then(handleClose);
  };

  const handleOpen = () => {
    if (!disabled) setOpen(true);
  };

  const handleClose = () => {
    clearErrors();
    inputRef.current.value = "";
    setOpen(false);
  };

  // TODO: Check if you can share by pressing enter
  const handleKeyPress = (e) => {
    if (isEnterKey(e)) shareNote(inputRef.current.value);
  };

  return (
    <ShareView
      disabled={disabled}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      inputRef={inputRef}
      onKeyPress={handleKeyPress}
      error={errors.share}
    />
  );
});

const ShareView = React.forwardRef(
  (
    { disabled, open, onOpen, onClose, onSubmit, inputRef, onKeyPress, error },
    ref
  ) => (
    <>
      <StyledIcon
        className={disabled ? "disabled" : ""}
        onClick={onOpen}
        hoverColor="#3498db"
      >
        <PersonAddIcon />
      </StyledIcon>
      <Modal
        open={open}
        title="Share Note"
        onClose={onClose}
        onAffirmative={onSubmit}
        affirmativeText="Share"
        text={"Share this note to provide edit and read access"}
      >
        <TextField
          onKeyPress={onKeyPress}
          inputRef={inputRef}
          error={error && true}
          helperText={error}
          autoFocus
          label="Email"
          type="email"
          fullWidth
        />
      </Modal>
    </>
  )
);

export default ShareContainer;
