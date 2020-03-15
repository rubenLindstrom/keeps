import React, { useContext } from "react";
import context from "../context";

import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(context);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated !== false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: rest.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
