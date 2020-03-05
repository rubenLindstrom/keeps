import React, { useEffect } from "react";
import "./app.css";

import { connect } from "react-redux";

// Components
import Editor from "./components/editor";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar/sidebar";

const app = ({ notes }) => {
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

const mapStateToProps = state => ({
  notes: state.note.notes
});

export default connect(mapStateToProps)(app);
