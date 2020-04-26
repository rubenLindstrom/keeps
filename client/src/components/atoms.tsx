import React from "react";
import styled from "styled-components";

type TitleProps = {
	children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ children }) => (
	<h1>{children}</h1>
);

interface StyledCardProps {
	width: Number;
}

const StyledCard = styled.div<StyledCardProps>`
	border-radius: 12px;
	padding: 1rem;
	box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.5);
	max-width: ${(props) => (props.width ? `${props.width}px` : "initial")};
	background-color: #fff;
`;

interface CardProps extends StyledCardProps {
	children: React.ReactNode;
	className: string;
}

export const Card: React.FC<CardProps> = ({ children, className, width }) => (
	<StyledCard width={width} className={className}>
		{children}
	</StyledCard>
);

const StyledError = styled.p`
	color: crimson;
	font-weight: bold;
`;

type ErrorProps = {
	children: React.ReactNode;
};

export const Error: React.FC<ErrorProps> = ({ children }) =>
	children ? <StyledError>{children}</StyledError> : null;
