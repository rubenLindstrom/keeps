import React, { useContext } from "react";
import AuthContext from "../contexts/authContext";

import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(AuthContext);
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
