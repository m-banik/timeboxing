import React from 'react';

type ErrorMessagePropsType = React.PropsWithChildren<{
  hasError: boolean;
  message: string;
}>;

export const ErrorMessage: React.FC<ErrorMessagePropsType> = ({
  hasError,
  message,
  children,
}) => {
  return <React.Fragment>{hasError ? message : children}</React.Fragment>;
};
