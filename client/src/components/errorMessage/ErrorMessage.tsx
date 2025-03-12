import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  color: red;
  background-color: #fdd;
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  margin: 10px 0;
`;

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

export default ErrorMessage;