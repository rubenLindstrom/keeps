import React from "react";
import styled from "styled-components";

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
	border-radius: 10px 0 0 0;
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
	background-color: rgba(0, 0, 0, 0.3);
	margin: 0;
	margin-right: 2rem;
	a {
		color: inherit;
	}
`;

const ImageCredit = ({ credit, creditLink, original }) => (
	<Credit>
		Photo by:{" "}
		<a href={creditLink} target="_blank" rel="noopener noreferrer">
			{credit}
		</a>
		, on{" "}
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

const BottomBar = ({ quote, bg }) => {
	return (
		<BottomBarContainer>
			{bg && quote && (
				<>
					<ImageCredit
						credit={bg.credit}
						creditLink={bg.creditLink}
						original={bg.original}
					/>
					<Quote {...quote} />
				</>
			)}
		</BottomBarContainer>
	);
};

export default BottomBar;
