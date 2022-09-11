import React from 'react';
import './styles.scss';

type ErrorMessagePropsType = React.PropsWithChildren<{
  hasError: boolean;
  message: string;
}>;

export const ErrorMessage: React.FC<ErrorMessagePropsType> = ({
  hasError,
  message,
  children,
}) => {
  return (
    <React.Fragment>
      {hasError ? (
        <div className="errorMessage">
          <span>{message}</span>
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
};
