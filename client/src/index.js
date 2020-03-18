import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { AuthProvider } from "./contexts/authContext";
import { NoteProvider } from "./contexts/noteContext";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
