import { ChangeEventHandler, MouseEventHandler } from 'react';
// ToDo: Changed due to the outer API
// import { nanoid } from 'nanoid';

export type IdType = number;
// export type IdType = ReturnType<typeof nanoid>;

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

export type TimeboxesApiType = {
  getTimebox: (timeboxId: IdType, accessToken?: string) => Promise<TimeboxType>;
  getTimeboxes: (accessToken?: string) => Promise<TimeboxType[]>;
  getTimeboxesByFullTextSearch: (
    searchQuery: string,
    accessToken?: string
  ) => Promise<TimeboxType[]>;
  addTimebox: (
    addedTimeboxData: TimeboxDataType,
    accessToken?: string
  ) => Promise<TimeboxType>;
  editTimebox: (
    editedTimebox: TimeboxType,
    accessToken?: string
  ) => Promise<TimeboxType>;
  partiallyUpdateTimebox: (
    partiallyUpdatedTimebox: PartialTimeboxType,
    accessToken?: string
  ) => Promise<TimeboxType>;
  removeTimebox: (
    removedTimeboxId: IdType,
    accessToken?: string
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
  accessToken?: string;
} & (
  | GetRequestParamsType
  | PostRequestParamsType
  | PutRequestParamsType
  | PatchRequestParamsType
  | DeleteRequestParamsType
);

export type MakeRequestType = (params: RequestParamsType) => Promise<unknown>;

export type AccessTokenType = string | null;
