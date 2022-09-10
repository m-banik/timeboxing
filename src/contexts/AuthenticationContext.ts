import { createContext } from 'react';
import { AccessTokenType } from '../common';

type AuthenticationContextType = {
  accessToken: AccessTokenType;
  onLogout?: VoidFunction;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  accessToken: null,
});
