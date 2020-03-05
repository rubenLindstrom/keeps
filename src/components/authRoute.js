import React from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

const authRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: rest.location } }} />
      )
    }
  />
);

const mapStatToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStatToProps)(authRoute);
