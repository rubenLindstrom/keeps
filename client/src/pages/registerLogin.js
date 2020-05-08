import React, { useState, useContext } from "react";

import AuthContext from "../contexts/authContext";

// Components
import { Title, Card, Error } from "../components/atoms";
import BottomBar from "../components/bottomBar";
import WelcomeView from "./welcome";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const MODES = {
  WELCOME: "WELCOME",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};

const RegisterLoginContainer = ({ quote, bg }) => {
  const [mode, setMode] = useState(MODES.WELCOME);
  const { login, register, errors, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const modeToProps = {
    [MODES.LOGIN]: {
      title: "Login",
      onSubmit: (e) => {
        e.preventDefault();
        login(email, password);
      },
      fields: [
        {
          value: email,
          onChange: (e) => setEmail(e.target.value),
          label: "Email",
          errors: errors.email,
          type: "email",
        },
        {
          value: password,
          onChange: (e) => setPassword(e.target.value),
          label: "Password",
          error: errors.password,
          type: "password",
        },
      ],
      bottomText: (
        <p>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setMode(MODES.REGISTER)}
          >
            Register here
          </span>
        </p>
      ),
    },
    [MODES.REGISTER]: {
      title: "Register",
      onSubmit: (e) => {
        e.preventDefault();
        register(email, password, cPassword);
      },
      fields: [
        {
          value: email,
          onChange: (e) => setEmail(e.target.value),
          label: "Email",
          errors: errors.email,
          type: "email",
        },
        {
          value: password,
          onChange: (e) => setPassword(e.target.value),
          label: "Password",
          error: errors.password,
          type: "password",
        },
        {
          value: cPassword,
          onChange: (e) => setCPassword(e.target.value),
          label: "Confirm Password",
          error: errors.cPassword,
          type: "password",
        },
      ],
      bottomText: (
        <p>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setMode(MODES.LOGIN)}
          >
            Log in here
          </span>
        </p>
      ),
    },
  };

  if (mode === MODES.WELCOME)
    return (
      <div className="center">
        <WelcomeView
          onLoginClick={() => setMode(MODES.LOGIN)}
          onRegisterClick={() => setMode(MODES.REGISTER)}
        />
        <BottomBar quote={quote} bg={bg} />
      </div>
    );
  else if (mode === MODES.LOGIN || mode === MODES.REGISTER) {
    const { title, onSubmit, fields, bottomText } = modeToProps[mode];
    return (
      <>
        <RegisterLoginView
          title={title}
          onSubmit={onSubmit}
          errors={errors}
          loading={loading}
          fields={fields}
          bottomText={bottomText}
        />
        <BottomBar quote={quote} bg={bg} />
      </>
    );
  }
};

const RegisterLoginView = ({
  title,
  onSubmit,
  errors,
  loading,
  fields,
  bottomText,
}) => (
  <Card className="center" errors={errors} width={300}>
    <Title>{title}</Title>
    <form onSubmit={onSubmit}>
      {fields.map(({ value, onChange, label, errors, type }) => (
        <TextField
          value={value}
          onChange={onChange}
          label={label}
          fullWidth
          type={type}
          error={errors && true}
          helperText={errors}
          key={label}
          margin="dense"
        />
      ))}
      <br />
      <br />
      <Button type="submit" variant="contained" mt={5}>
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
      <Error>{errors.error}</Error>
      {bottomText}
    </form>
  </Card>
);

export default RegisterLoginContainer;
