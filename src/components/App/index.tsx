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
  state = {
    accessToken: null,
  };

  logoutTimeoutId: number | null = null;

  componentDidMount() {
    const accessToken = this.getAccessTokenFromLocalStorage();

    if (accessToken !== null) {
      this.setState((prevState) => ({ ...prevState, accessToken }));
      this.setLogoutTimeout();
    }
  }

  componentWillUnmount() {
    this.clearLogoutTimeout();
  }

  handleLoginAttempt = (accessToken: string) => {
    this.saveAccessTokenInLocalStorage(accessToken);
    this.setState((prevState) => ({ ...prevState, accessToken }));
    this.setLogoutTimeout();
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

  getDecodedDataFromAccessToken = (): JwtDecodedDataType | void => {
    const { accessToken } = this.state;
    if (accessToken === null) {
      return;
    }

    const decodedData = decode(accessToken);
    if (checkIfIsOfJwtDecodedDataType(decodedData)) {
      return decodedData;
    }
  };

  getUserEmail = (): string | void => {
    const decodedData = this.getDecodedDataFromAccessToken();
    return decodedData?.email;
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
