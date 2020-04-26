import React, { useContext } from "react";
import AuthContext from "../contexts/authContext";

import { Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...rest }) => {
	const { authenticated } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated !== false ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: rest.location }
						}}
					/>
				)
			}
		/>
	);
};
export const UnAuthRoute = ({ render, ...rest }) => {
	const { authenticated } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated ? (
					<Redirect to={{ pathname: "/" }} />
				) : (
					render(props)
				)
			}
		/>
	);
};
