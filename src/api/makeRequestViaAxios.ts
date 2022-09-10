import axios, { AxiosRequestConfig } from 'axios';
import { TIMEBOXES_BASE_URL } from '.';
import {
  AccessTokenType,
  MakeRequestType,
  TimeboxDataType,
  TimeboxType,
  UserLoginDataType,
  PartialTimeboxType,
} from '../common';

const createRequestConfig = (accessToken?: AccessTokenType) => {
  const requestConfig: AxiosRequestConfig = {};
  if (typeof accessToken === 'string') {
    requestConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return requestConfig;
};

const throwError = () => {
  throw new Error('An error occurred while trying to connect with the server!');
};

export const makeRequestViaAxios: MakeRequestType = async (params) => {
  const config = createRequestConfig(params.accessToken);
  let url = params.baseUrl || TIMEBOXES_BASE_URL;
  let requestBody:
    | TimeboxType
    | TimeboxDataType
    | UserLoginDataType
    | PartialTimeboxType
    | undefined;

  switch (params.method) {
    case 'GET':
      if (typeof params.id === 'number') {
        url += `/${params.id}`;
      } else if (params.phrase) {
        url += `?q=${encodeURIComponent(params.phrase)}`;
      }

      return axios
        .get(url, config)
        .then(({ data }) => data)
        .catch(() => throwError());
    case 'POST':
      requestBody = params.data;

      return axios
        .post(url, requestBody, config)
        .then(({ data }) => data)
        .catch(() => throwError());
    case 'PUT':
      url += `/${params.data.id}`;
      requestBody = params.data;

      return axios
        .put(url, requestBody, config)
        .then(({ data }) => data)
        .catch(() => throwError());
    case 'PATCH':
      url += `/${params.data.id}`;
      requestBody = params.data;

      return axios
        .patch(url, requestBody, config)
        .then(({ data }) => data)
        .catch(() => throwError());
    case 'DELETE':
      url += `/${params.id}`;

      return axios.delete(url, config).catch(() => throwError());
    default:
      return new Promise((resolve, reject) => {
        reject('An error occurred while trying to connect with the server!');
      });
  }
};
