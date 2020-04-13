import React from "react";
import styled from "styled-components";

export const Title = ({ children }) => <h1>{children}</h1>;

const StyledCard = styled.div`
	border-radius: 12px;
	padding: 1rem;
	box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.5);
	max-width: ${(props) => (props.width ? `${props.width}px` : "initial")};
	background-color: #fff;
`;

export const Card = ({ children, className, width }) => (
	<StyledCard width={width} className={className}>
		{children}
	</StyledCard>
);

const StyledError = styled.p`
	color: crimson;
	font-weight: bold;
`;

export const Error = ({ children }) =>
	children ? <StyledError>{children}</StyledError> : null;
