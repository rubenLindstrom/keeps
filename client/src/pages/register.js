import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";

import { isEmail } from "../helpers";

// Components
import { Title, Card } from "../components/atoms";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// TODO: Add login options with other providers
const RegisterContainer = ({ history }) => {
  const { register, authenticated } = useContext(AuthContext);

  const refs = {
    email: useRef(null),
    pass: useRef(null),
    cPass: useRef(null)
  };

  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [authenticated]);

  const handleSubmit = e => {
    e.preventDefault();

    const email = refs.email.current.value;
    const pass = refs.pass.current.value;
    const cPass = refs.cPass.current.value;

    // TODO: Set errors
    const errors = {};

    if (!isEmail(email)) errors.email = "Email invalid!";
    if (pass.length < 6) errors.password = "Password too short!";
    if (pass !== cPass) errors.cPassword = "Passwords do not match";

    if (Object.keys(errors).length) return console.log(errors);

    register(email, pass, cPass);
  };

  return <RegisterView onSubmit={handleSubmit} refs={refs} />;
};

const RegisterView = ({ onSubmit, refs }) => {
  return (
    <Card className="center" width={300}>
      <Title>Register</Title>
      <form onSubmit={onSubmit}>
        <TextField
          inputRef={refs.email}
          label="Email"
          fullWidth
          margin="normal"
        />
        <TextField
          inputRef={refs.pass}
          label="Password"
          fullWidth
          type="password"
          m={2}
        />
        <TextField
          inputRef={refs.cPass}
          label="Confirm Password"
          fullWidth
          type="password"
        />
        <br />
        <br />
        <Button type="submit" variant="contained" mt={5}>
          Submit
        </Button>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </form>
    </Card>
  );
};

export default RegisterContainer;
