import React, { useRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getRandomImage } from "../api/unsplash";
import { getRandomQuote } from "../api/quote";

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
	const [quote, setQuote] = useState(null);
	const [bg, setBg] = useState(null);

	useEffect(() => {
		if (authenticated) {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [authenticated]);

	useEffect(() => {
		const getData = async () => {
			// Get background and quote
			Promise.all([getRandomQuote(), getRandomImage("nature")]).then(
				([quote, image]) => {
					setQuote(quote);
					setBg(image);
				}
			);
		};
		getData();
		// eslint-disable-next-line
	}, []);

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
			bg={bg}
			quote={quote}
		/>
	);
};

const BottomBar = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	right: 0;
	left: 0;
	bottom: 0;
	padding: 0.25em;
	background-color: rgba(0, 0, 0, 0.5);
	color: #eee;
`;

const QuoteContainer = styled.section`
	text-align: right;
	max-width: 340px;
	p {
		margin: 0;
		margin-right: 1rem;

		&.quote-author {
			margin-top: 0.25rem;
			font-size: 0.85rem;
			font-style: italic;
		}
	}
`;

const ImageCredit = ({ children }) => (
	<p style={{ margin: 0 }}>Image by: {children}</p>
);

const Quote = ({ author, text }) => (
	<QuoteContainer>
		<p className="quote-body">{text}</p>
		<p className="quote-author">- {author}</p>
	</QuoteContainer>
);

const LoginView = ({ onSubmit, refs, errors, loading, quote, bg }) => {
	return bg && quote ? (
		<div
			className="inner-wrapper"
			style={{
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundImage: `url(${bg.url})`
			}}
		>
			<Card className="center" width={300}>
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
					<Error>{errors.general}</Error>
					<p>
						Don't have an account?{" "}
						<Link to="/register">Register here</Link>
					</p>
				</form>
			</Card>
			<BottomBar>
				<ImageCredit>{bg.credit}</ImageCredit>
				<Quote {...quote} />
			</BottomBar>
		</div>
	) : (
		<></>
	);
};

export default LoginContainer;
