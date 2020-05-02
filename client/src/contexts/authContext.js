import React, { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import auth from "../firebaseAuth";
import {
	isEmpty,
	isEmail,
	translateClientError,
	translateServerError,
	hasErrors
} from "../helpers";
import { errorMessages, PASSWORD_MIN_LENGTH } from "../constants";

import { doRegister, setToken, unsetToken } from "../services";

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
					.then((token) => {
						console.log(token);
						return token;
					})
					.then((token) => setToken(token))
					.then(() => setAuthenticated(true))
					.catch(() => setAuthenticated(false));
			} else setAuthenticated(false);
		});
	}, []);

	const login = (email, password) => {
		const validation = {};
		if (isEmpty(email)) validation.email = errorMessages.mustNotBeEmpty;
		else if (!isEmail(email)) validation.email = errorMessages.invalidEmail;
		if (isEmpty(password))
			validation.password = errorMessages.mustNotBeEmpty;
		else if (password.length < PASSWORD_MIN_LENGTH)
			validation.password = errorMessages.tooShort;

		if (hasErrors(validation).length)
			return setErrors(translateServerError(validation));

		setErrors({});
		setLoading(true);
		auth.signInWithEmailAndPassword(email, password)
			.then()
			.catch((err) => {
				setErrors(translateClientError(err));
			})
			.finally(() => setLoading(false));
	};

	const register = (email, password, cPassword) => {
		const validation = {};
		if (isEmpty(email)) validation.email = errorMessages.mustNotBeEmpty;
		else if (!isEmail(email)) validation.email = errorMessages.invalidEmail;

		if (isEmpty(password))
			validation.password = errorMessages.mustNotBeEmpty;
		else if (password.length < PASSWORD_MIN_LENGTH)
			validation.password = errorMessages.tooShort;

		if (isEmpty(cPassword))
			validation.cPassword = errorMessages.mustNotBeEmpty;
		else if (cPassword !== password)
			validation.cPassword = errorMessages.mustMatch;

		if (hasErrors(validation).length)
			return setErrors(translateServerError(validation));

		setErrors({});
		setLoading(true);
		doRegister(email, password, cPassword)
			.then(() => login(email, password))
			.catch((err) => setErrors(translateServerError(err)))
			.finally(() => setLoading(false));
	};

	const logout = () => {
		auth.signOut();
		unsetToken();
	};

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
