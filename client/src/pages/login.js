import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { isEmail } from "../util";

import { login } from "../redux/services";

// Components
import { Title, Card } from "../components/atoms";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// TODO: Add login options with other providers
const LoginContainer = () => {
  const refs = {
    email: useRef(null),
    pass: useRef(null)
  };

  const handleSubmit = e => {
    e.preventDefault();
    const email = refs.email.current.value;
    const pass = refs.pass.current.value;

    // TODO: Set error messages
    if (!isEmail(email)) return;
    if (pass.length < 6) return;

    login(email, pass);
  };

  return <LoginView onSubmit={handleSubmit} refs={refs} />;
};

const LoginView = ({ onSubmit, refs }) => {
  return (
    <Card className="center" width={300}>
      <Title>Login</Title>
      <form onSubmit={onSubmit}>
        <TextField inputRef={refs.email} label="Email" fullWidth />
        <TextField
          inputRef={refs.pass}
          label="Password"
          fullWidth
          type="password"
        />
        <br />
        <br />
        <Button type="submit" variant="contained" mt={5}>
          Submit
        </Button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </Card>
  );
};

export default LoginContainer;
