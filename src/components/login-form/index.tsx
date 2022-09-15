import React from 'react';
import { LoadingSpinner } from '../loading-spinner';
import { AuthorizationApi } from '../../api/AuthorizationApi';
import { UserLoginDataType } from '../../common/types';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import './styles.scss';

const authorizationApi = new AuthorizationApi({
  requestTool: 'axios',
  baseUrl: 'http://localhost:4001/login',
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [wasThereAnInvalidLoginAttempt, setWasThereAnInvalidLoginAttempt] =
    React.useState(false);

  const { onLoginAttempt } = React.useContext(AuthenticationContext);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleLoginAttempt = React.useCallback(
    (userLoginData: UserLoginDataType) => {
      setIsLoading(true);

      authorizationApi
        .login(userLoginData)
        .then((accessToken) => {
          setIsLoading(false);
          setWasThereAnInvalidLoginAttempt(false);

          onLoginAttempt(accessToken);
        })
        .catch(() => {
          setIsLoading(false);
          setWasThereAnInvalidLoginAttempt(true);
        });
    },
    [onLoginAttempt]
  );

  const handleSubmit = React.useCallback<React.EventHandler<React.FormEvent>>(
    (event) => {
      event.preventDefault();

      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (email !== undefined && password !== undefined) {
        const userLoginData = { email, password };
        handleLoginAttempt(userLoginData);
      }
    },
    [handleLoginAttempt]
  );

  return isLoading ? (
    <LoadingSpinner fullWidth />
  ) : (
    <form className={`loginForm`} onSubmit={handleSubmit}>
      {wasThereAnInvalidLoginAttempt ? (
        <p className="loginForm__errorMessage">Nieudana próba logowania!</p>
      ) : null}
      <label>
        E-mail:
        <input ref={emailRef} type="email" />
      </label>
      <br />
      <label>
        Hasło:
        <input ref={passwordRef} type="password" />
      </label>
      <br />
      <button>Zaloguj</button>
    </form>
  );
};
