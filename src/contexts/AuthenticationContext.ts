import { createContext } from 'react';
import { AccessTokenType } from '../common';

type AuthenticationContextType = {
  accessToken: AccessTokenType;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  accessToken: null,
});
