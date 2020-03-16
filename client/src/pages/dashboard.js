import React from "react";

// Components
import Editor from "../containers/editorContainer";
import Nav from "../components/nav";
import Sidebar from "../components/sidebar/sidebar";

const dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="inner-wrapper">
        <Nav />
        <div className="editor">
          <Editor />
        </div>
      </div>
    </>
  );
};

export default dashboard;
