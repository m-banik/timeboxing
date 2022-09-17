import React from 'react';
import { ErrorMessage } from '../error-message';

export type ErrorBoundaryPropsType = React.PropsWithChildren<{
  message: string;
}>;

type ErrorBoundaryStateType = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryPropsType,
  ErrorBoundaryStateType
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    console.log('Wystąpił następujący błąd:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { message, children } = this.props;

    return (
      <ErrorMessage hasError={hasError} message={message}>
        {children}
      </ErrorMessage>
    );
  }
}
