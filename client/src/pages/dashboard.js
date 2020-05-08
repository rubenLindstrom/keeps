import React from "react";

// Components
import Editor from "../components/editor";
import Nav from "../components/nav/nav";
import Sidebar from "../components/sidebar/sidebar";

const dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="inner-wrapper">
        <Nav />
        <Editor />
      </div>
    </>
  );
};

export default dashboard;
