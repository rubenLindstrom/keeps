import React, { useState, useContext } from "react";

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
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    shareNote(email).then((success) => {
      success && handleClose();
    });
  };

  const handleOpen = () => {
    if (!disabled) setOpen(true);
  };

  const handleClose = () => {
    clearErrors();
    setEmail("");
    setOpen(false);
  };

  const handleKeyPress = (e) => {
    if (isEnterKey(e)) handleSubmit();
  };

  return (
    <ShareView
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={disabled}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onKeyPress={handleKeyPress}
      error={errors.share}
    />
  );
});

const ShareView = React.forwardRef(
  (
    {
      value,
      onChange,
      disabled,
      open,
      onOpen,
      onClose,
      onSubmit,
      onKeyPress,
      error,
    },
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
        text={
          <>
            Invite some friends you would like to share <br /> this note with!
          </>
        }
      >
        <TextField
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
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
