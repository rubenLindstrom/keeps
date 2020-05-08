import React, { useContext } from "react";
import NoteContext from "../../contexts/noteContext";

import ShareNote from "./shareNote";
import { StyledIcon } from "../atoms";

import Tooltip from "@material-ui/core/Tooltip";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

// TODO: Add tooltips
const Controls = () => {
  const { deleteNote, selectedNote, saveNote } = useContext(NoteContext);
  const disabled = selectedNote === null;

  return (
    <>
      <Tooltip title="Share">
        <ShareNote disabled={disabled} />
      </Tooltip>
      <Tooltip title="Delete">
        <StyledIcon hoverColor="#e74c3c" className={disabled ? "disabled" : ""}>
          <DeleteIcon onClick={() => !disabled && deleteNote()} />
        </StyledIcon>
      </Tooltip>
      <Tooltip title="Save">
        <StyledIcon hoverColor="#3498db" className={disabled ? "disabled" : ""}>
          <SaveIcon onClick={() => !disabled && saveNote(selectedNote.id)} />
        </StyledIcon>
      </Tooltip>
    </>
  );
};

export default Controls;
