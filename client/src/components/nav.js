import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import NoteContext from "../contexts/noteContext";

import { isEnterKey } from "../helpers";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
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

const ShareContainer = styled.span`
  position: relative;
  text-align: center;

  > div {
    /* position: absolute;
    top: 100%;*/
    color: #fff;
    border-radius: 12px;
    z-index: 1;
    width: 200px;
    border: 1px solid #000;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const NoteControls = () => {
  const { deleteNote, selectedNote, saveNote, shareNote } = useContext(
    NoteContext
  );
  const [shareOpen, setShareOpen] = useState(false);
  const disabled = selectedNote === null;
  const shareRef = useRef();

  const handleBlur = () => {
    if (shareOpen) setShareOpen(false);
  };

  const handleShareChange = e => {
    if (isEnterKey(e)) shareNote(shareRef.current.value);
  };
  return (
    <>
      <ShareContainer onBlur={handleBlur}>
        {shareOpen ? (
          <ShareModal
            inputRef={shareRef}
            open={shareOpen}
            onKeyPress={handleShareChange}
          />
        ) : (
          <StyledIcon
            className={disabled ? "disabled" : ""}
            onClick={() => setShareOpen(true)}
            hoverColor="#3498db"
          >
            <PersonAddIcon />
          </StyledIcon>
        )}
      </ShareContainer>
      <StyledIcon hoverColor="#e74c3c" className={disabled ? "disabled" : ""}>
        <DeleteIcon onClick={() => !disabled && deleteNote()} />
      </StyledIcon>
      <StyledIcon hoverColor="#3498db" className={disabled ? "disabled" : ""}>
        <SaveIcon onClick={() => !disabled && saveNote(selectedNote.id)} />
      </StyledIcon>
    </>
  );
};

const ShareModal = ({ open, inputRef, onKeyPress }) =>
  open ? (
    <div onKeyPress={onKeyPress}>
      <TextField
        inputRef={inputRef}
        classes={{ root: "test" }}
        className="share-input"
        label="Share"
      />
    </div>
  ) : null;

export default nav;
