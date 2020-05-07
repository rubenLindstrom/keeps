import React, { useState, useRef, useContext } from "react";

import NoteContext from "../../contexts/noteContext";
import AuthContext from "../../contexts/authContext";
import { isEnterKey, isEmail, isEmpty } from "../../helpers";

import { StyledIcon } from "../atoms";
import Modal from "../modal";

// Mui
import TextField from "@material-ui/core/TextField";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

const ShareContainer = React.forwardRef(({ disabled }, ref) => {
  const { selectedNote, shareNote, errors } = useContext(NoteContext);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [ownError, setOwnError] = useState(null);
  const inputRef = useRef();

  const handleSubmit = (_) => {
    const email = inputRef.current.value;

    // TODO: Set error
    if (disabled) setOwnError("You can't share this note yet");
    else if (isEmpty(email)) setOwnError("Email can't be empty");
    else if (!isEmail(email)) setOwnError("Invalid email");
    else if (selectedNote.owner !== user.uid)
      setOwnError("You don't have permission to share this note");
    else shareNote(email).then(handleClose);
  };

  const handleOpen = () => {
    if (!disabled) setOpen(true);
  };

  const handleClose = () => {
    setOwnError(null);
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
      error={ownError || errors.error}
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
