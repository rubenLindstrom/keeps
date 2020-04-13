import React, { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import auth from "../firebaseAuth";

import {
	doLogout,
	doRegister,
	doValidateToken,
	setToken,
	unsetToken
} from "../services";

const parseError = (err) => {
	const errors = {};
	if (err.email) errors.email = err.email;
	switch (err.code) {
		case "auth/user-not-found":
			errors.general = "No such user found";
			break;
		case "auth/email-already-exists":
			errors.email = "Email is already in use";
			break;
		case "auth/id-token-expired":
			errors.general = "You have been logged out due to inactivity";
			break;
		case "auth/invalid-password":
			errors.pasword = "Invalid password";
			break;
		default:
			errors.general = "An error has occured";
	}
	return errors;
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(null);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setErrors({});
	}, [location.pathname]);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				auth.currentUser
					.getIdToken(true)
					.then(setToken)
					.then(() => setAuthenticated(true))
					.catch(() => setAuthenticated(false));
			} else setAuthenticated(false);
		});
	}, []);

	const login = (email, password) => {
		setLoading(true);
		setErrors({});
		auth.signInWithEmailAndPassword(email, password)
			.then()
			.catch((err) => setErrors(parseError(err)))
			.finally(() => setLoading(false));
	};

	const register = (email, password, cPassword) => {
		setLoading(true);
		doRegister(email, password, cPassword)
			.then(() => login(email, password))
			.catch((err) => setErrors(parseError(err)))
			.finally(() => setLoading(false));
	};

	const logout = () => auth.signOut();

	return (
		<AuthContext.Provider
			value={{ authenticated, login, logout, register, errors, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
export { AuthProvider };
