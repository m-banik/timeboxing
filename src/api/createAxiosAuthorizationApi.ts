import axios from 'axios';
import { LOGIN_BASE_URL } from '../api';
import { AuthorizationApiType } from '../common';
import { assertIsOfAccessTokenResponseType } from '../utilities';

type CreateAxiosAuthorizationApiConfigType = {
  baseUrl?: string;
};

type CreateAxiosAuthorizationApiType = (
  config?: CreateAxiosAuthorizationApiConfigType
) => AuthorizationApiType;

export const createAxiosAuthorizationApi: CreateAxiosAuthorizationApiType = (
  config
) => {
  const baseUrl = config?.baseUrl || LOGIN_BASE_URL;

  const AuthorizationApi: AuthorizationApiType = {
    login: async (userLoginData) =>
      axios.post(baseUrl, userLoginData).then(({ data }) => {
        assertIsOfAccessTokenResponseType(data);
        return data.accessToken;
      }),
  };

  return AuthorizationApi;
};
