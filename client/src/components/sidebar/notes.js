import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import NoteContext from "../../contexts/noteContext";
import AuthContext from "../../contexts/authContext";

import Collapsible from "react-collapsible";

const Box = styled.div`
  box-sizing: border-box;
  width: 200px;
  border-bottom: 1px solid #666;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  background-color: #b5a586;

  &.selected {
    background-color: wheat;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.5);
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

  &.date {
    font-size: 0.8rem;
    margin-left: 0.1rem;
    color: #333;
    white-space: nowrap;
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
        <P className="date">{createdAt.substring(0, 10)}</P>
      </Upper>
      <P className="body">
        {body.replace(/<\/?[^>]+>/gi, " ").substring(0, PREVIEW_LENGTH)}
        {body.length > PREVIEW_LENGTH && "..."}
      </P>
    </Box>
  );
};

const BlankMessage = styled.p`
  text-align: center;
  background-color: #eee;
  margin: 0;
  padding: 0.5rem 0;
`;

const Notes = () => {
  const { notes } = useContext(NoteContext);
  const { user } = useContext(AuthContext);
  const [ownOpen, setOwnOpen] = useState(false);
  const [sharedOpen, setSharedOpen] = useState(false);

  const ownNotes = [];
  const sharedNotes = [];

  if (notes) {
    Object.values(notes).forEach((note) =>
      note.owner === user.uid ? ownNotes.push(note) : sharedNotes.push(note)
    );
  }

  useEffect(() => {
    ownNotes.length > 0 && setOwnOpen(true);
  }, [ownNotes.length]);

  useEffect(() => {
    sharedNotes.length > 0 && setSharedOpen(true);
  }, [sharedNotes.length]);

  if (!notes) return <div className="notes"></div>;

  const renderNotes = (title, open, notes, emptyText) => (
    <Collapsible trigger={title} open={open} easing="ease-out">
      {notes.length ? (
        notes.map((el) => <Note key={el.id} {...el} />)
      ) : (
        <BlankMessage>{emptyText}</BlankMessage>
      )}
    </Collapsible>
  );

  return (
    <div className="notes">
      {notes && (
        <>
          {renderNotes(
            "My notes",
            ownOpen,
            ownNotes,
            "Add a note and it will appear here!"
          )}
          {renderNotes(
            "Shared with me",
            sharedOpen,
            sharedNotes,
            "When someone shares a note with you, it will appear here!"
          )}
        </>
      )}
    </div>
  );
};

export default Notes;
