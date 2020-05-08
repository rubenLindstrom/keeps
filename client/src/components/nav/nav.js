import React from "react";
import styled from "styled-components";
import Controls from "./controls";
import logo from "../../images/logo.png";

import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

const Logo = styled.img`
  width: 185px;
  height: auto;
  padding: 0.5rem 0;
  object-fit: contain;
  transition: width 0.5s ease-out;

  @media only screen and (max-width: 700px) {
    padding-left: 1rem;
    width: 120px;
  }
`;

const nav = ({ sidebarOpen, setSidebarOpen }) => (
  <div className="nav">
    <div className="hamburger">
      {sidebarOpen ? (
        <MenuOpenIcon onClick={() => setSidebarOpen(false)} fontSize="large" />
      ) : (
        <MenuIcon onClick={() => setSidebarOpen(true)} fontSize="large" />
      )}
    </div>
    <Logo className="logo" src={logo} alt="Logo" />
    <div className="note-controls">
      <Controls />
    </div>
  </div>
);

export default nav;
