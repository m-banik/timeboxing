import React from 'react';
import { LoadingSpinner } from '..';
import { createAxiosAuthorizationApi } from '../../api';
import { UserLoginDataType } from '../../common';
import { AuthenticationContext } from '../../contexts';
import './styles.scss';

const authorizationApi = createAxiosAuthorizationApi({
  baseUrl: 'http://localhost:4001/login',
});

type LoginFormStateType = {
  isLoading: boolean;
  wasThereAnInvalidLoginAttempt: boolean;
};

export class LoginForm extends React.Component<{}, LoginFormStateType> {
  context!: React.ContextType<typeof AuthenticationContext>;

  state = {
    isLoading: false,
    wasThereAnInvalidLoginAttempt: false,
  };

  emailRef = React.createRef<HTMLInputElement>();
  passwordRef = React.createRef<HTMLInputElement>();

  handleLoginAttempt = (userLoginData: UserLoginDataType) => {
    this.setState((prevState) => ({ ...prevState, isLoading: true }));

    authorizationApi
      .login(userLoginData)
      .then((accessToken) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          wasThereAnInvalidLoginAttempt: false,
        }));

        this.context.onLoginAttempt(accessToken);
      })
      .catch(() =>
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          wasThereAnInvalidLoginAttempt: true,
        }))
      );
  };

  handleSubmit: React.EventHandler<React.FormEvent> = (event) => {
    event.preventDefault();

    const email = this.emailRef.current?.value;
    const password = this.passwordRef.current?.value;

    if (email !== undefined && password !== undefined) {
      const userLoginData = { email, password };
      this.handleLoginAttempt(userLoginData);
    }
  };

  render() {
    const { isLoading, wasThereAnInvalidLoginAttempt } = this.state;

    return isLoading ? (
      <LoadingSpinner fullWidth />
    ) : (
      <form className={`loginForm`} onSubmit={this.handleSubmit}>
        {wasThereAnInvalidLoginAttempt ? (
          <p className="loginForm__errorMessage">Nieudana próba logowania!</p>
        ) : null}
        <label>
          E-mail:
          <input ref={this.emailRef} type="email" />
        </label>
        <br />
        <label>
          Hasło:
          <input ref={this.passwordRef} type="password" />
        </label>
        <br />
        <button>Zaloguj</button>
      </form>
    );
  }
}

LoginForm.contextType = AuthenticationContext;
