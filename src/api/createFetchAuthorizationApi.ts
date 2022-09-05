import { makeRequestViaFetch } from '.';
import { LOGIN_BASE_URL } from '../api';
import { CreateAuthorizationApiType, AuthorizationApiType } from '../common';
import { assertIsOfAccessTokenResponseType } from '../utilities';

export const createFetchAuthorizationApi: CreateAuthorizationApiType = (
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
