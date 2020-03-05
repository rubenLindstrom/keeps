import React from "react";

// Components
import { Title } from "../components/atoms";

// TODO: Add login options with other providers
const loginContainer = () => {
  return <LoginView />;
};

const LoginView = () => {
  return (
    <div className="center card">
      <Title>Login</Title>
      <form></form>
    </div>
  );
};

export default loginContainer;
