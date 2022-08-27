import {
  IdType,
  TimeboxDataType,
  TimeboxType,
  PartialTimeboxType,
} from '../common';

const BASE_URL = 'http://localhost:4000/timeboxes';

type GetRequestViaFetchParamsType = { method: 'GET'; data?: IdType };

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
  data: IdType;
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

export const makeRequestViaFetch: MakeRequestViaFetchType = async ({
  baseUrl,
  method,
  data,
}) => {
  let url = baseUrl || BASE_URL;
  let requestBody:
    | TimeboxType
    | TimeboxDataType
    | PartialTimeboxType
    | undefined;

  switch (method) {
    case 'GET':
      if (!!data) {
        url += `/${data}`;
      }
      break;
    case 'POST':
      requestBody = data;
      break;
    case 'PUT':
    case 'PATCH':
      url += `/${data.id}`;
      requestBody = data;
      break;
    case 'DELETE':
    default:
      url += `/${data}`;
      break;
  }

  const response = await fetch(url, {
    method,
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
