import { createContext } from 'react';
import { AccessTokenType } from '../common/types';

type AuthenticationContextType = {
  accessToken: AccessTokenType;
  onLoginAttempt: (accessToken: AccessTokenType) => void;
  onLogout: VoidFunction;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  accessToken: null,
  onLoginAttempt: (accessToken) => {},
  onLogout: () => {},
});
