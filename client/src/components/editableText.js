import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { isEmpty, isEnterKey } from "../helpers";

const Wrapper = styled.span`
  margin: 0;
  font-size: 2.2rem;
  padding: 0.2rem;
`;
const P = styled.p`
  margin: 0;
  padding: 0.1rem;
  display: inline-block;
`;

const Input = styled.input`
  height: 100%;
  font-size: inherit;
  box-sizing: border-box;
`;

const EditableText = ({ children, save }) => {
  const [editMode, setEditMode] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(children);
  const inputRef = useRef();

  useEffect(() => {
    if (editMode) inputRef.current.focus();
  }, [editMode]);

  const submitTitle = () => {
    if (isEmpty(workingTitle) || workingTitle === children) {
      setWorkingTitle(children);
      setEditMode(false);
    } else {
      save(workingTitle).then(() => setEditMode(false));
    }
  };

  const handleKeyPress = (e) => {
    if (isEnterKey(e)) submitTitle();
  };

  return (
    <Wrapper>
      {editMode ? (
        <Input
          ref={inputRef}
          defaultValue={children}
          onChange={(e) => setWorkingTitle(e.target.value)}
          type="text"
          onBlur={submitTitle}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <P
          onDoubleClick={() => setEditMode(true)}
          onTouchEnd={() => setEditMode(true)}
        >
          {children}
        </P>
      )}
    </Wrapper>
  );
};

export default EditableText;
