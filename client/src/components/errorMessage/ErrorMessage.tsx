import React from 'react';
import { ErrorMessageProps } from './types';
import { ErrorContainer } from './styled';





const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

export default ErrorMessage;