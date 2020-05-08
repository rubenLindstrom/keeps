import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../constants";

// Components
import AddNote from "./addNote";
import Notes from "./notes";

const Sidebar = ({ open }) => {
  return (
    <div className={`sidebar${open ? " open" : ""}`}>
      <AddNote />
      <Notes />
      <UserControls />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: { backgroundColor: COLORS.RED, color: "#fff" },
}));

const UserControls = () => {
  const { logout } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className="user-options">
      <Button
        onClick={logout}
        fullWidth
        variant="contained"
        className={classes.button}
      >
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
