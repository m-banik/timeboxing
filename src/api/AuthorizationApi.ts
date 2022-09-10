import { Api, ApiConfigType, LOGIN_BASE_URL } from '.';
import { AuthorizationApiType } from '../common';
import { assertIsOfAccessTokenResponseType } from '../utilities';

export class AuthorizationApi extends Api implements AuthorizationApiType {
  constructor(config: ApiConfigType) {
    super({
      ...config,
      baseUrl: config.baseUrl ? config.baseUrl : LOGIN_BASE_URL,
    });
  }

  public login: AuthorizationApiType['login'] = (userLoginData) =>
    this.requestHandler({
      baseUrl: this.baseUrl,
      method: 'POST',
      data: userLoginData,
    }).then((result) => {
      assertIsOfAccessTokenResponseType(result);
      return result.accessToken;
    });
}
