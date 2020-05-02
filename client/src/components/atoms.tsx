import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { hasErrors } from "../helpers";

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
	errors: ErrorResponse;
}

export const Card: React.FC<CardProps> = ({
	children,
	className,
	width,
	errors
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (hasErrors(errors) && cardRef.current) {
			cardRef.current.classList.add("error");
			cardRef.current.classList.add("error-animate");
			// If the user tries to resubmit again within one second, it is assumed to be a double tap,
			// and animation should not be played again
			setTimeout(
				() =>
					cardRef.current &&
					cardRef.current.classList.remove("error-animate"),
				1000
			);
		} else if (cardRef.current) cardRef.current.classList.remove("error");
	}, [errors]);

	return (
		<StyledCard ref={cardRef} width={width} className={className}>
			{children}
		</StyledCard>
	);
};

const StyledError = styled.p`
	color: crimson;
	font-weight: bold;
`;

type ErrorProps = {
	children: React.ReactNode;
};

export const Error: React.FC<ErrorProps> = ({ children }) =>
	children ? <StyledError>{children}</StyledError> : null;
