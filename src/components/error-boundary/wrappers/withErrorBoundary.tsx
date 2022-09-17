import React from 'react';
import { ErrorBoundaryPropsType, ErrorBoundary } from '..';

export const withErrorBoundary = (
  UnsafeComponent: React.FC<React.PropsWithChildren>
) => {
  const SafeComponent: React.FC<ErrorBoundaryPropsType> = ({
    message,
    ...otherProps
  }) => {
    return (
      <ErrorBoundary message={message}>
        <UnsafeComponent {...otherProps} />
      </ErrorBoundary>
    );
  };
  return SafeComponent;
};

export const createWithErrorBoundary =
  (UnsafeComponent: React.FC) => (message: string) => {
    const SafeComponent: React.FC = (props) => {
      return (
        <ErrorBoundary message={message}>
          <UnsafeComponent {...props} />
        </ErrorBoundary>
      );
    };
    return SafeComponent;
  };
