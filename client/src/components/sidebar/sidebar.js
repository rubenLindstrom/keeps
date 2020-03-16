import React, { useContext } from "react";
import context from "../../context";

import Button from "@material-ui/core/Button";

// Components
import AddNote from "./addNote";
import Note from "./note";

const Sidebar = () => {
  const { logout } = useContext(context);
  return (
    <div className="sidebar">
      <AddNote />
      <Notes />
      <UserControls logout={logout} />
    </div>
  );
};

const Notes = () => {
  const { notes } = useContext(context);
  return (
    <div className="notes">
      {notes ? (
        Object.keys(notes).length ? (
          Object.values(notes).map(el => <Note key={el.id} {...el} />)
        ) : (
          <p>You have no notes yet...</p>
        )
      ) : (
        <p>Loading notes...</p>
      )}
    </div>
  );
};

const UserControls = ({ logout }) => (
  <div className="user-options">
    <Button onClick={logout} fullWidth variant="contained">
      Logout
    </Button>
  </div>
);

export default Sidebar;
