import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";

// Components
import { Title, Card, Error } from "../components/atoms";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// TODO: Add login options with other providers
const RegisterContainer = ({ history }) => {
	const { register, authenticated, errors } = useContext(AuthContext);

	const refs = {
		email: useRef(null),
		pass: useRef(null),
		cPass: useRef(null)
	};

	useEffect(() => {
		if (authenticated) {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [authenticated]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const email = refs.email.current.value;
		const pass = refs.pass.current.value;
		const cPass = refs.cPass.current.value;

		register(email, pass, cPass);
	};

	return <RegisterView onSubmit={handleSubmit} refs={refs} errors={errors} />;
};

const RegisterView = ({ onSubmit, refs, errors }) => {
	return (
		<Card className="center" errors={errors} width={300}>
			<Title>Register</Title>
			<form onSubmit={onSubmit}>
				<TextField
					inputRef={refs.email}
					label="Email"
					fullWidth
					margin="normal"
					error={errors.email && true}
					helperText={errors.email}
				/>
				<TextField
					inputRef={refs.pass}
					label="Password"
					fullWidth
					type="password"
					m={2}
					error={errors.password && true}
					helperText={errors.password}
				/>
				<TextField
					inputRef={refs.cPass}
					label="Confirm Password"
					fullWidth
					type="password"
					error={errors.cPassword && true}
					helperText={errors.cPassword}
				/>
				<br />
				<br />
				<Button type="submit" variant="contained" mt={5}>
					Submit
				</Button>
				<Error>{errors.error}</Error>
				<p>
					Already have an account?{" "}
					<Link to="/login">Log in here</Link>
				</p>
			</form>
		</Card>
	);
};

export default RegisterContainer;
