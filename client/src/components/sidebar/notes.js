import React, { useContext } from "react";
import styled from "styled-components";

import NoteContext from "../../contexts/noteContext";
import AuthContext from "../../contexts/authContext";

import Collapsible from "react-collapsible";

const Box = styled.div`
  box-sizing: border-box;
  width: 200px;
  border-bottom: 1px solid #666;
  background-color: wheat;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;

  &.selected {
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.5) inset;
    background-color: #ccba97;
  }
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const P = styled.p`
  margin: 0;
  margin-bottom: 0.25rem;

  &.title {
    text-transform: uppercase;
    font-weight: bold;
  }

  &.body {
    font-size: 0.9rem;
    color: #333;
  }
`;

const PREVIEW_LENGTH = 25;

const Note = ({ title, createdAt, body, id }) => {
  const { selectNote, selectedNote } = useContext(NoteContext);
  return (
    <Box
      className={`note ${
        selectedNote && id === selectedNote.id ? "selected" : ""
      }`}
      onClick={() => selectNote(id)}
    >
      <Upper className="upper-row">
        <P className="title">{title}</P>
        <P>{createdAt.substring(0, 10)}</P>
      </Upper>
      <P className="body">
        {body.replace(/<\/?[^>]+>/gi, " ").substring(0, PREVIEW_LENGTH)}
        {body.length > PREVIEW_LENGTH && "..."}
      </P>
    </Box>
  );
};

const Notes = () => {
  const { notes } = useContext(NoteContext);
  const { user } = useContext(AuthContext);

  if (!notes) return <div className="notes"></div>;

  const ownNotes = [];
  const sharedNotes = [];

  Object.values(notes).forEach((note) =>
    note.owner === user.uid ? ownNotes.push(note) : sharedNotes.push(note)
  );

  const renderNotes = (title, notes) => (
    <Collapsible trigger={title} open easing="ease-out">
      {notes.map((el) => (
        <Note key={el.id} {...el} />
      ))}
    </Collapsible>
  );

  return (
    <div className="notes">
      {notes && (
        <>
          {renderNotes("My notes", ownNotes)}
          {renderNotes("Shared with me", sharedNotes)}
        </>
      )}
    </div>
  );
};

export default Notes;
