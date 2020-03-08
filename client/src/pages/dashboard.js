import React from "react";

// Components
import Editor from "../components/editor";
import Nav from "../components/nav";
import Sidebar from "../components/sidebar/sidebar";

const dashboard = () => {
  return (
    <>
      <Sidebar />
      <div class="inner-wrapper">
        <Nav />
        <Editor />
      </div>
    </>
  );
};

export default dashboard;
