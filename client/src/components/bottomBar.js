import React, { useContext } from "react";
import styled from "styled-components";

import InspirationContext from "../contexts/inspirationContext";

const BottomBarContainer = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	right: 0;
	left: 0;
	bottom: 0;
	color: #eee;
`;

const QuoteContainer = styled.section`
	padding: 0.5em;
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.3);
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

const Credit = styled.p`
	margin: 0;
	margin-right: 2rem;
	a {
		color: inherit;
	}
`;

const ImageCredit = ({ credit, original }) => (
	<Credit>
		Photo by: {credit}, on{" "}
		<a href={original} target="_blank" rel="noopener noreferrer">
			Unsplash
		</a>
	</Credit>
);

const Quote = ({ author, text }) => (
	<QuoteContainer>
		<p className="quote-body">{text}</p>
		<p className="quote-author">- {author}</p>
	</QuoteContainer>
);

const BottomBar = () => {
	const { bg, quote } = useContext(InspirationContext);
	return (
		<BottomBarContainer>
			{bg && quote && (
				<>
					<ImageCredit credit={bg.credit} original={bg.original} />
					<Quote {...quote} />
				</>
			)}
		</BottomBarContainer>
	);
};

export default BottomBar;
