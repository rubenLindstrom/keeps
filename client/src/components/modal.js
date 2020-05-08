import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

import { SpinnerButton } from "./atoms";

const Modal = ({
  open,
  title,
  children,
  text,
  onClose,
  onAffirmative,
  affirmativeText,
  loading,
  warning,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color={warning ? "primary" : "secondary"}
        >
          Cancel
        </Button>
        <SpinnerButton
          onClick={onAffirmative}
          color={warning ? "secondary" : "primary"}
          spinnerColor="white"
          loading={loading}
          size={16}
        >
          {affirmativeText}
        </SpinnerButton>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
