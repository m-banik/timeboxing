import { Api, ApiConfigType } from './Api';
import { LOGIN_BASE_URL } from './baseUrls';
import { AuthorizationApiType } from '../common/types';
import { assertIsOfAccessTokenResponseType } from '../utilities/typeGuards';

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
