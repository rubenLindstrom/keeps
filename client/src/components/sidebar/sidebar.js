import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../constants";

// Components
import AddNote from "./addNote";
import Notes from "./notes";
import Modal from "../modal";

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
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className="user-options">
      <Modal
        open={open}
        title="Logout"
        onClose={() => setOpen(false)}
        onAffirmative={logout}
        affirmativeText="Yes, bye!"
        text={<>Are you sure you want to log out?</>}
        warning
      />
      <Button
        onClick={() => setOpen(true)}
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
