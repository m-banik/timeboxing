import React from 'react';
import decode from 'jwt-decode';
import { ErrorBoundary, LoginForm, TimeboxList, EditableTimebox } from '..';
import { JwtDecodedDataType } from '../../common';
import { checkIfIsOfJwtDecodedDataType } from '../../utilities';
import './styles.scss';

type AppStateType = {
  accessToken: string | null;
};

export class App extends React.Component<{}, AppStateType> {
  state: AppStateType = {
    accessToken: null,
  };

  logoutTimeoutId: number | null = null;

  componentDidMount() {
    const accessToken = this.getAccessTokenFromLocalStorage();

    if (accessToken !== null) {
      this.handleLoginAttempt(accessToken);
    }
  }

  componentWillUnmount() {
    this.clearLogoutTimeout();
  }

  handleLoginAttempt = (accessToken: string) => {
    this.saveAccessTokenInLocalStorage(accessToken);

    const tokenExpirationTimestamp = this.getTokenExpirationTimestamp() || 0;
    const sessionDuration =
      tokenExpirationTimestamp * 1000 - new Date().getTime();

    if (sessionDuration >= 5000) {
      this.setState((prevState) => ({ ...prevState, accessToken }));
      this.setLogoutTimeout(sessionDuration);
    } else {
      this.removeAccessTokenFromLocalStorage();
    }
  };

  handleLogout = () => {
    if (this.state.accessToken === null) {
      return;
    }

    this.removeAccessTokenFromLocalStorage();
    this.setState((prevState) => ({ ...prevState, accessToken: null }));
    this.clearLogoutTimeout();
  };

  saveAccessTokenInLocalStorage = (accessToken: string) =>
    window.localStorage.setItem('accessToken', accessToken);

  getAccessTokenFromLocalStorage = () =>
    window.localStorage.getItem('accessToken');

  removeAccessTokenFromLocalStorage = () =>
    window.localStorage.removeItem('accessToken');

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

  getDecodedDataFromAccessToken = (): JwtDecodedDataType | undefined => {
    const accessToken = this.getAccessTokenFromLocalStorage();
    const decodedData = accessToken ? decode(accessToken) : accessToken;

    if (checkIfIsOfJwtDecodedDataType(decodedData)) {
      return decodedData;
    }
  };

  getUserEmail = (): string | null => {
    const decodedData = this.getDecodedDataFromAccessToken();
    return decodedData?.email || null;
  };

  getTokenExpirationTimestamp = (): number | null => {
    const decodedData = this.getDecodedDataFromAccessToken();
    return decodedData?.exp || null;
  };

  render() {
    const { accessToken } = this.state;
    const userEmail = this.getUserEmail();

    return (
      <div className="App">
        <ErrorBoundary message={'Something went wrong...'}>
          {accessToken === null ? (
            <LoginForm onLogin={this.handleLoginAttempt} />
          ) : (
            <>
              <div className="App__userPanel">
                {userEmail ? (
                  <p className="App__userPanel__welcomeMessage">{`Witaj, ${userEmail}`}</p>
                ) : null}
                <button
                  className="App__userPanel__logoutButton"
                  onClick={this.handleLogout}
                >
                  Wyloguj
                </button>
              </div>
              <TimeboxList accessToken={accessToken} />
              <EditableTimebox />
            </>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}
