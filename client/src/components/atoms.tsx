import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { hasErrors } from "../helpers";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export const SpinnerButton: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  spinnerColor?: string;
  size?: number;
}> = ({ loading, children, spinnerColor, size, ...rest }) => (
  <Button type="submit" variant="contained" {...rest}>
    {loading ? (
      <span style={{ color: spinnerColor ? spinnerColor : "initial" }}>
        <CircularProgress color={"inherit"} size={size ? size : 24} />
      </span>
    ) : (
      children
    )}
  </Button>
);

interface StyledCardProps {
  width: Number;
  borderColor: string;
}

const StyledCard = styled.div<StyledCardProps>`
  border-radius: 0 0 12px 12px;
  padding: 1rem;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.5);
  max-width: ${(props) => (props.width ? `${props.width}px` : "initial")};
  background-color: #fff;
  border-top: 5px solid ${(props) => props.borderColor};
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
  errors,
  borderColor,
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
          cardRef.current && cardRef.current.classList.remove("error-animate"),
        1000
      );
    } else if (cardRef.current) cardRef.current.classList.remove("error");
  }, [errors]);

  return (
    <StyledCard
      ref={cardRef}
      width={width}
      className={className}
      borderColor={borderColor}
    >
      {children}
    </StyledCard>
  );
};

const StyledError = styled.p`
  color: crimson;
  font-weight: bold;
`;

export const Error: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  children ? <StyledError>{children}</StyledError> : null;

export const StyledIcon = styled.span<{ hoverColor: string }>`
  transition: color 0.2s ease;
  margin: 0 0.25rem;
  svg {
    font-size: 2rem;
  }
  cursor: pointer;
  &:hover {
    color: ${(props) => props.hoverColor};
  }
  &.disabled {
    color: #666;
    cursor: initial;
    &:hover {
      color: #666;
    }
  }
`;
