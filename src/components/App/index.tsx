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

  componentDidMount() {
    const accessToken = window.localStorage.getItem('accessToken');

    if (accessToken !== null) {
      this.setState((prevState) => ({ ...prevState, accessToken }));
    }
  }

  handleLoginAttempt = (accessToken: string) => {
    this.saveAccessTokenInLocalStorage(accessToken);
    this.setState((prevState) => ({ ...prevState, accessToken }));
  };

  handleLogout = () => {
    if (this.state.accessToken === null) {
      return;
    }

    this.removeAccessTokenFromLocalStorage();
    this.setState((prevState) => ({ ...prevState, accessToken: null }));
  };

  saveAccessTokenInLocalStorage = (accessToken: string) =>
    window.localStorage.setItem('accessToken', accessToken);

  removeAccessTokenFromLocalStorage = () =>
    window.localStorage.removeItem('accessToken');

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
