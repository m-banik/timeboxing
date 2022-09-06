import axios from 'axios';
import { LOGIN_BASE_URL } from '../api';
import { CreateAuthorizationApiType, AuthorizationApiType } from '../common';
import { assertIsOfAccessTokenResponseType } from '../utilities';

export const createAxiosAuthorizationApi: CreateAuthorizationApiType = (
  config
) => {
  const baseUrl = config?.baseUrl || LOGIN_BASE_URL;

  const authorizationApi: AuthorizationApiType = {
    login: async (userLoginData) =>
      axios.post(baseUrl, userLoginData).then(({ data }) => {
        assertIsOfAccessTokenResponseType(data);
        return data.accessToken;
      }),
  };

  return authorizationApi;
};
