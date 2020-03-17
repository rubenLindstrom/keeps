import React, { useContext } from "react";
import context from "../../context";

import Button from "@material-ui/core/Button";

// Components
import AddNote from "./addNote";
import Notes from "./notes";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <AddNote />
      <Notes />
      <UserControls />
    </div>
  );
};

const UserControls = () => {
  const { logout } = useContext(context);
  return (
    <div className="user-options">
      <Button onClick={logout} fullWidth variant="contained">
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
