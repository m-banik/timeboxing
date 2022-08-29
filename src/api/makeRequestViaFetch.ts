import { TIMEBOXES_BASE_URL } from '.';
import {
  IdType,
  TimeboxDataType,
  TimeboxType,
  PartialTimeboxType,
} from '../common';

type GetRequestViaFetchParamsType = {
  method: 'GET';
  id?: IdType;
  phrase?: string;
};

type PostRequestViaFetchParamsType = {
  method: 'POST';
  data: TimeboxDataType | TimeboxType;
};

type PutRequestViaFetchParamsType = {
  method: 'PUT';
  data: TimeboxType;
};

type PatchRequestViaFetchParamsType = {
  method: 'PATCH';
  data: PartialTimeboxType;
};

type DeleteRequestViaFetchParamsType = {
  method: 'DELETE';
  id: IdType;
};

type RequestViaFetchParamsType = { baseUrl?: string } & (
  | GetRequestViaFetchParamsType
  | PostRequestViaFetchParamsType
  | PutRequestViaFetchParamsType
  | PatchRequestViaFetchParamsType
  | DeleteRequestViaFetchParamsType
);

type MakeRequestViaFetchType = (
  params: RequestViaFetchParamsType
) => Promise<unknown>;

export const makeRequestViaFetch: MakeRequestViaFetchType = async (params) => {
  let url = params.baseUrl || TIMEBOXES_BASE_URL;
  let requestBody:
    | TimeboxType
    | TimeboxDataType
    | PartialTimeboxType
    | undefined;

  switch (params.method) {
    case 'GET':
      if (typeof params.id === 'number') {
        url += `/${params.id}`;
      } else if (params.phrase) {
        url += `?q=${encodeURIComponent(params.phrase)}`;
      }

      break;
    case 'POST':
      requestBody = params.data;
      break;
    case 'PUT':
    case 'PATCH':
      url += `/${params.data.id}`;
      requestBody = params.data;
      break;
    case 'DELETE':
    default:
      url += `/${params.id}`;
      break;
  }

  const response = await fetch(url, {
    method: params.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody ? JSON.stringify(requestBody) : requestBody,
  });

  if (!response.ok) {
    throw new Error(
      'An error occurred while trying to connect with the server!'
    );
  }

  return response.json();
};
