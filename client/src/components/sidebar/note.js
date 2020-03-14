import React from "react";
import styled from "styled-components";

const Box = styled.div`
  box-sizing: border-box;
  width: 200px;
  border-bottom: 1px solid #666;
  padding: 0.5rem;
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

const note = ({ title, date, body, id }) => {
  return (
    <Box className="note">
      <Upper className="upper-row">
        <P className="title">{title}</P>
        <P>{date}</P>
      </Upper>
      <P className="body">{body}</P>
    </Box>
  );
};

export default note;
