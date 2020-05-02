import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext";

import Button from "@material-ui/core/Button";
import Collapsible from "react-collapsible";

// Components
import AddNote from "./addNote";
import Notes from "./notes";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <AddNote />
      <Collapsible trigger="My notes" open easing="ease-in-out">
        <Notes />
      </Collapsible>
      <UserControls />
    </div>
  );
};

const UserControls = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="user-options">
      <Button onClick={logout} fullWidth variant="contained">
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
