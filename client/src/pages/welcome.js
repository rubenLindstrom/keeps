import React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const Banner = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: 500px;
  max-width: 100vw;
  border-radius: 14px;
  box-sizing: border-box;
  padding: 2rem 0;
  align-self: center;
`;

const H1 = styled.h1`
  color: #fff;
  font-size: 2.4rem;
  text-align: center;
`;

const H2 = styled.h1`
  color: #fff;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 300;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const ColoredButton = withStyles((theme) => ({
  root: {
    borderRadius: "2px",
    margin: "0.5rem",
    width: "9rem",
    fontSize: "1.1rem",
    color: "#fff",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  green: { backgroundColor: COLORS.GREEN },
  blue: { backgroundColor: COLORS.BLUE },
}));

const WelcomeView = ({ onLoginClick, onRegisterClick }) => {
  const classes = useStyles();
  return (
    <Banner>
      <H1>Welcome to Keeps</H1>
      <H2>The ultimate notekeeping app for social thinkers</H2>
      <ButtonContainer>
        <ColoredButton
          onClick={onLoginClick}
          variant="contained"
          className={classes.green}
        >
          Login
        </ColoredButton>
        <ColoredButton
          onClick={onRegisterClick}
          variant="contained"
          className={classes.blue}
        >
          Register
        </ColoredButton>
      </ButtonContainer>
    </Banner>
  );
};

export default WelcomeView;
