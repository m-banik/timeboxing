import { makeRequestViaFetch } from '.';
import { LOGIN_BASE_URL } from '../api';
import { AuthorizationApiType } from '../common';
import { assertIsOfAccessTokenResponseType } from '../utilities';

type CreateFetchAuthorizationApiConfigType = {
  baseUrl?: string;
};

type CreateFetchAuthorizationApiType = (
  config?: CreateFetchAuthorizationApiConfigType
) => AuthorizationApiType;

export const createFetchAuthorizationApi: CreateFetchAuthorizationApiType = (
  config
) => {
  const baseUrl = config?.baseUrl || LOGIN_BASE_URL;

  const AuthorizationApi: AuthorizationApiType = {
    login: async (userLoginData) =>
      makeRequestViaFetch({
        baseUrl,
        method: 'POST',
        data: userLoginData,
      }).then((result) => {
        assertIsOfAccessTokenResponseType(result);
        return result.accessToken;
      }),
  };

  return AuthorizationApi;
};
