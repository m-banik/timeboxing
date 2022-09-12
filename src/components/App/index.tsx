import React from 'react';
import { ErrorBoundary } from '../error-boundary';
import { LoginForm } from '../login-form';
import { LoadingSpinner } from '../loading-spinner';
import { AccessTokenType } from '../../common/types';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { AccessTokenController } from '../../utilities/AccessTokenController';
import './styles.scss';

const AuthenticatedApp = React.lazy(() =>
  import('../authenticated-app').then((imported) => ({
    default: imported.AuthenticatedApp,
  }))
);

const accessTokenController = new AccessTokenController();

export const App: React.FC = () => {
  const [accessToken, setAccessToken] = React.useState<AccessTokenType>(null);

  const logoutTimeoutIdRef = React.useRef<number | null>(null);

  const clearLogoutTimeout = React.useCallback(() => {
    if (logoutTimeoutIdRef.current !== null) {
      window.clearTimeout(logoutTimeoutIdRef.current);
      logoutTimeoutIdRef.current = null;
    }
  }, []);

  const handleLogout = React.useCallback(() => {
    if (accessToken === null) {
      return;
    }

    accessTokenController.removeAccessToken();
    setAccessToken(null);
    clearLogoutTimeout();
  }, [accessToken, clearLogoutTimeout]);

  const setLogoutTimeout = React.useCallback(
    (sessionDuration = 60 * 60 * 1000) => {
      logoutTimeoutIdRef.current = window.setTimeout(
        handleLogout,
        sessionDuration
      );
    },
    [handleLogout]
  );

  const handleLoginAttempt = React.useCallback(
    (providedToken: AccessTokenType) => {
      accessTokenController.accessToken = providedToken;

      const tokenExpirationTimestamp =
        accessTokenController.getTokenExpirationTimestamp() || 0;
      const sessionDuration =
        tokenExpirationTimestamp * 1000 - new Date().getTime();

      if (sessionDuration >= 5000) {
        setAccessToken(providedToken);
        setLogoutTimeout(sessionDuration);
      } else {
        accessTokenController.removeAccessToken();
      }
    },
    [setLogoutTimeout]
  );

  const contextValue = React.useMemo(
    () => ({
      accessToken,
      onLoginAttempt: handleLoginAttempt,
      onLogout: handleLogout,
    }),
    [accessToken, handleLoginAttempt, handleLogout]
  );

  React.useEffect(() => {
    const storedToken = accessTokenController.accessToken;

    if (storedToken !== null) {
      handleLoginAttempt(storedToken);
    }

    return () => clearLogoutTimeout();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <ErrorBoundary message={'Something went wrong...'}>
        <AuthenticationContext.Provider value={contextValue}>
          {accessToken === null ? (
            <LoginForm />
          ) : (
            <React.Suspense fallback={<LoadingSpinner fullWidth />}>
              <AuthenticatedApp />
            </React.Suspense>
          )}
        </AuthenticationContext.Provider>
      </ErrorBoundary>
    </div>
  );
};
