import { ChangeEventHandler, MouseEventHandler } from 'react';

export type IdType = number;

export type TimeboxType = {
  id: IdType;
  title: string;
  totalTimeInMinutes: number;
};

export type TimeboxHandlerType = (timebox: TimeboxType) => void;

export type TimeboxDataType = Omit<TimeboxType, 'id'>;

export type PartialTimeboxType = Partial<TimeboxType> & { id: IdType };

export type TimeboxDataHandlerType = (timebox: TimeboxDataType) => void;

export type InputChangeEventHandlerType = ChangeEventHandler<HTMLInputElement>;

export type ButtonEventHandlerType = MouseEventHandler<HTMLButtonElement>;

export type AccessTokenType = string | null;

export type TimeboxesApiType = {
  getTimebox: (
    timeboxId: IdType,
    accessToken?: AccessTokenType
  ) => Promise<TimeboxType>;
  getTimeboxes: (accessToken?: AccessTokenType) => Promise<TimeboxType[]>;
  getTimeboxesByFullTextSearch: (
    searchQuery: string,
    accessToken?: AccessTokenType
  ) => Promise<TimeboxType[]>;
  addTimebox: (
    addedTimeboxData: TimeboxDataType,
    accessToken?: AccessTokenType
  ) => Promise<TimeboxType>;
  editTimebox: (
    editedTimebox: TimeboxType,
    accessToken?: AccessTokenType
  ) => Promise<TimeboxType>;
  partiallyUpdateTimebox: (
    partiallyUpdatedTimebox: PartialTimeboxType,
    accessToken?: AccessTokenType
  ) => Promise<TimeboxType>;
  removeTimebox: (
    removedTimeboxId: IdType,
    accessToken?: AccessTokenType
  ) => Promise<unknown>;
};

export type RequestToolKindType = 'axios' | 'fetch';

export type UserLoginDataType = {
  email: string;
  password: string;
};

export type AuthorizationApiType = {
  login: (userLoginData: UserLoginDataType) => Promise<string>;
};

export type CreateAuthorizationApiConfigType = {
  baseUrl?: string;
};

export type CreateAuthorizationApiType = (
  config: CreateAuthorizationApiConfigType
) => AuthorizationApiType;

export type AccessTokenResponseType = {
  accessToken: string;
};

export type JwtDecodedDataType = {
  email: string;
  exp: number;
  iat: number;
  sub: string;
};

export type GetRequestParamsType = {
  method: 'GET';
  id?: IdType;
  phrase?: string;
};

export type PostRequestParamsType = {
  method: 'POST';
  data: TimeboxDataType | TimeboxType | UserLoginDataType;
};

export type PutRequestParamsType = {
  method: 'PUT';
  data: TimeboxType;
};

export type PatchRequestParamsType = {
  method: 'PATCH';
  data: PartialTimeboxType;
};

export type DeleteRequestParamsType = {
  method: 'DELETE';
  id: IdType;
};

export type RequestParamsType = {
  baseUrl?: string;
  accessToken?: AccessTokenType;
} & (
  | GetRequestParamsType
  | PostRequestParamsType
  | PutRequestParamsType
  | PatchRequestParamsType
  | DeleteRequestParamsType
);

export type MakeRequestType = (params: RequestParamsType) => Promise<unknown>;
