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

type AppStateType = {
  accessToken: string | null;
};

export class App extends React.Component<{}, AppStateType> {
  state: AppStateType = {
    accessToken: null,
  };

  logoutTimeoutId: number | null = null;

  componentDidMount() {
    const accessToken = accessTokenController.accessToken;

    if (accessToken !== null) {
      this.handleLoginAttempt(accessToken);
    }
  }

  componentWillUnmount() {
    this.clearLogoutTimeout();
  }

  handleLoginAttempt = (accessToken: AccessTokenType) => {
    accessTokenController.accessToken = accessToken;

    const tokenExpirationTimestamp =
      accessTokenController.getTokenExpirationTimestamp() || 0;
    const sessionDuration =
      tokenExpirationTimestamp * 1000 - new Date().getTime();

    if (sessionDuration >= 5000) {
      this.setState((prevState) => ({ ...prevState, accessToken }));
      this.setLogoutTimeout(sessionDuration);
    } else {
      accessTokenController.removeAccessToken();
    }
  };

  handleLogout = () => {
    if (this.state.accessToken === null) {
      return;
    }

    accessTokenController.removeAccessToken();
    this.setState((prevState) => ({ ...prevState, accessToken: null }));
    this.clearLogoutTimeout();
  };

  setLogoutTimeout = (sessionDuration = 60 * 60 * 1000) => {
    this.logoutTimeoutId = window.setTimeout(
      this.handleLogout,
      sessionDuration
    );
  };

  clearLogoutTimeout = () => {
    if (this.logoutTimeoutId !== null) {
      window.clearTimeout(this.logoutTimeoutId);
      this.logoutTimeoutId = null;
    }
  };

  render() {
    const { accessToken } = this.state;
    const contextValue = {
      accessToken,
      onLoginAttempt: this.handleLoginAttempt,
      onLogout: this.handleLogout,
    };

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
  }
}
