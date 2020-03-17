import React, { useContext } from "react";
import context from "../../context";
import styled from "styled-components";

const Box = styled.div`
  box-sizing: border-box;
  width: 200px;
  border-bottom: 1px solid #666;
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

const Note = ({ title, createdAt, body, id }) => {
  const { selectNote, selectedNote } = useContext(context);
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
        {body.replace(/<\/?[^>]+>/gi, " ").substring(0, 15)}
      </P>
    </Box>
  );
};

const Notes = () => {
  const { notes } = useContext(context);

  return (
    <div className="notes">
      {notes && Object.values(notes).map(el => <Note key={el.id} {...el} />)}
    </div>
  );
};

export default Notes;
