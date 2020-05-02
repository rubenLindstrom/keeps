import React, { useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../contexts/authContext";

import { isEmail } from "../helpers";

// Components
import { Title, Card, Error } from "../components/atoms";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// TODO: Add login options with other providers
const LoginContainer = ({ history }) => {
	const { login, authenticated, errors, loading } = useContext(AuthContext);

	useEffect(() => {
		if (authenticated) {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [authenticated]);

	const refs = {
		email: useRef(null),
		pass: useRef(null)
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const email = refs.email.current.value;
		const pass = refs.pass.current.value;

		// TODO: Set error messages
		if (!isEmail(email)) errors.email = "Invalid email";
		if (pass.length < 6)
			errors.password = "Password must be at least 6 characters";

		login(email, pass);
	};

	return (
		<LoginView
			onSubmit={handleSubmit}
			refs={refs}
			errors={errors}
			loading={loading}
		/>
	);
};

const LoginView = ({ onSubmit, refs, errors, loading }) => (
	<Card className="center" errors={errors} width={300}>
		<Title>Login</Title>
		<form onSubmit={onSubmit}>
			<TextField
				inputRef={refs.email}
				label="Email"
				fullWidth
				error={errors.email && true}
				helperText={errors.email}
			/>
			<TextField
				inputRef={refs.pass}
				label="Password"
				fullWidth
				type="password"
				error={errors.password && true}
				helperText={errors.password}
			/>
			<br />
			<br />
			<Button type="submit" variant="contained" mt={5}>
				{loading ? <CircularProgress size={24} /> : "Submit"}
			</Button>
			<Error>{errors.error}</Error>
			<p>
				Don't have an account? <Link to="/register">Register here</Link>
			</p>
		</form>
	</Card>
);

export default LoginContainer;
