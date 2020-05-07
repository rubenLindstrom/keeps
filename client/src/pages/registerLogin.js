import React, { useState, useRef, useContext } from "react";

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

  const emailRef = useRef();
  const passwordRef = useRef();
  const cPasswordRef = useRef();

  const modeToProps = {
    [MODES.LOGIN]: {
      title: "Login",
      onSubmit: () => login(emailRef.current.value, passwordRef.current.value),
      fields: [
        {
          ref: emailRef,
          label: "Email",
          errors: errors.email,
          type: "email",
        },
        {
          ref: passwordRef,
          label: "Password",
          error: errors.password,
          type: "password",
        },
      ],
      bottomText: (
        <p>
          Don't have an account?{" "}
          <span
            style={{ color: "blue" }}
            onClick={() => setMode(MODES.REGISTER)}
          >
            Register here
          </span>
        </p>
      ),
    },
    [MODES.REGISTER]: {
      title: "Register",
      onSubmit: () =>
        register(
          emailRef.current.value,
          passwordRef.current.value,
          cPasswordRef.current.value
        ),
      fields: [
        {
          ref: emailRef,
          label: "Email",
          errors: errors.email,
          type: "email",
        },
        {
          ref: passwordRef,
          label: "Password",
          error: errors.password,
          type: "password",
        },
        {
          ref: cPasswordRef,
          label: "Confirm Password",
          error: errors.cPassword,
          type: "password",
        },
      ],
      bottomText: (
        <p>
          Already have an account?{" "}
          <span style={{ color: "blue" }} onClick={() => setMode(MODES.LOGIN)}>
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
      {fields.map(({ ref, label, errors, type }) => (
        <TextField
          inputRef={ref}
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
