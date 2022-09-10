import { createContext } from 'react';

type AuthenticationContextType = {
  accessToken: string | null;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  accessToken: null,
});
