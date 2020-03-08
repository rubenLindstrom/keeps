import React from "react";

import { login } from "../redux/services";

// Components
import { Title, Card } from "../components/atoms";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// TODO: Add login options with other providers
const loginContainer = () => {
  const handleSubmit = e => {
    e.preventDefault();
    login("test", "test");
  };

  return <LoginView onSubmit={handleSubmit} />;
};

const LoginView = ({ onSubmit }) => {
  return (
    <Card className="center" width={300}>
      <Title>Login</Title>
      <form onSubmit={onSubmit}>
        <TextField label="Email" fullWidth />
        <TextField label="Password" fullWidth />
        <br />
        <br />
        <Button type="submit" variant="contained" mt={5}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default loginContainer;
