import { makeRequestViaAxios, makeRequestViaFetch } from '.';
import { MakeRequestType, RequestToolKindType } from '../common';

export type ApiConfigType = {
  baseUrl?: string;
  requestTool?: RequestToolKindType;
};

export class Api {
  private _baseUrl = '';
  private _requestHandler = makeRequestViaFetch;

  constructor(config: ApiConfigType) {
    if (typeof config?.baseUrl === 'string') {
      this.baseUrl = config.baseUrl;
    }

    if (typeof config.requestTool === 'string') {
      this.setRequestHandlerByToolHandler(config.requestTool);
    }
  }

  public get baseUrl() {
    return this._baseUrl;
  }

  public get requestHandler(): MakeRequestType {
    return this._requestHandler;
  }

  public set baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public set requestHandler(requestHandler: MakeRequestType) {
    this._requestHandler = requestHandler;
  }

  public setRequestHandlerByToolHandler(requestToolKind: RequestToolKindType) {
    switch (requestToolKind) {
      case 'axios':
        this._requestHandler = makeRequestViaAxios;
        break;
      case 'fetch':
      default:
        this._requestHandler = makeRequestViaFetch;
    }
  }
}
