import decode from 'jwt-decode';
import { checkIfIsOfJwtDecodedDataType } from '.';
import { AccessTokenType, JwtDecodedDataType } from '../common';

export class AccessTokenController {
  private _accessToken: AccessTokenType = null;

  constructor(providedAccessToken?: AccessTokenType) {
    const accessToken =
      providedAccessToken || this.getAccessTokenFromLocalStorage();

    this.accessToken = accessToken;
  }

  public get accessToken() {
    return this._accessToken;
  }

  public set accessToken(accessToken: AccessTokenType) {
    if (this.accessToken !== accessToken) {
      this._accessToken = accessToken;
      this.saveAccessTokenInLocalStorage();
    }
  }

  public removeAccessToken = () => {
    this.accessToken = null;
    this.removeAccessTokenFromLocalStorage();
  };

  private saveAccessTokenInLocalStorage = () =>
    this.accessToken &&
    window.localStorage.setItem('accessToken', this.accessToken);

  private getAccessTokenFromLocalStorage = () =>
    window.localStorage.getItem('accessToken');

  private removeAccessTokenFromLocalStorage = () =>
    window.localStorage.removeItem('accessToken');

  public getDecodedDataFromAccessToken = (): JwtDecodedDataType | undefined => {
    const accessToken = this.getAccessTokenFromLocalStorage();
    const decodedData = accessToken ? decode(accessToken) : accessToken;

    if (checkIfIsOfJwtDecodedDataType(decodedData)) {
      return decodedData;
    }
  };

  public getTokenExpirationTimestamp = (): number | null => {
    const decodedData = this.getDecodedDataFromAccessToken();
    return decodedData?.exp || null;
  };

  public getUserEmail = (): string | null => {
    const decodedData = this.getDecodedDataFromAccessToken();
    return decodedData?.email || null;
  };
}
