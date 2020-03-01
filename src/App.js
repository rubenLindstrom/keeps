import React from "react";
import "./app.css";

// Components
import Editor from "./components/editor";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";

const app = () => {
  return (
    <div className="App">
      <Sidebar />
      <div class="inner-wrapper">
        <Nav />
        <Editor />
      </div>
    </div>
  );
};

export default app;
