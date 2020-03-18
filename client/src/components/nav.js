import React, { useContext } from "react";
import styled from "styled-components";
import NoteContext from "../contexts/noteContext";

import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

const nav = () => (
  <div className="nav">
    <h1>Keeps</h1>
    <div className="note-controls">
      <NoteControls />
    </div>
  </div>
);

const StyledIcon = styled.span`
  transition: color 0.2s ease;
  margin: 0 0.25rem;
  svg {
    font-size: 2rem;
  }
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor};
  }
  &.disabled {
    color: #666;
    cursor: pointer;
    &:hover {
      color: #666;
    }
  }
`;

const NoteControls = () => {
  const { deleteNote, selectedNote, saveNote } = useContext(NoteContext);
  const disabled = selectedNote === null;

  return (
    <>
      <StyledIcon hoverColor="#e74c3c" className={disabled ? "disabled" : ""}>
        <DeleteIcon onClick={() => !disabled && deleteNote()} />
      </StyledIcon>
      <StyledIcon hoverColor="#3498db" className={disabled ? "disabled" : ""}>
        <SaveIcon onClick={() => !disabled && saveNote(selectedNote.id)} />
      </StyledIcon>
    </>
  );
};

export default nav;
