import React from 'react';
import { LoadingSpinner } from '..';
import { createAxiosAuthorizationApi } from '../../api';
// import { createFetchAuthorizationApi } from '../../api';
import { UserLoginDataType } from '../../common';
import './styles.scss';

const authorizationApi = createAxiosAuthorizationApi({
  baseUrl: 'http://localhost:4001/login',
});

// const authorizationApi = createFetchAuthorizationApi({
//   baseUrl: 'http://localhost:4001/login',
// });

type LoginFormPropsType = {
  onLogin: (accessToken: string) => void;
};

type LoginFormStateType = {
  isLoading: boolean;
  wasThereAnInvalidLoginAttempt: boolean;
};

export class LoginForm extends React.Component<
  LoginFormPropsType,
  LoginFormStateType
> {
  constructor(props: LoginFormPropsType) {
    super(props);
    this.state = {
      isLoading: false,
      wasThereAnInvalidLoginAttempt: false,
    };

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;

  handleLoginAttempt = async (userLoginData: UserLoginDataType) => {
    this.setState((prevState) => ({ ...prevState, isLoading: true }));

    authorizationApi
      .login(userLoginData)
      .then((accessToken) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          wasThereAnInvalidLoginAttempt: false,
        }));

        this.props.onLogin(accessToken);
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
