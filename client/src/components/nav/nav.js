import React from "react";
import styled from "styled-components";
import Controls from "./controls";
import logo from "../../images/logo.png";

const Logo = styled.img`
  width: 185px;
  height: auto;
  padding: 0.5rem 0;
`;

const nav = () => (
  <div className="nav">
    <Logo src={logo} alt="Logo" />
    <div className="note-controls">
      <Controls />
    </div>
  </div>
);

export default nav;
