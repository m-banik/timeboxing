import { makeRequestViaFetch, makeRequestViaAxios } from '.';
import {
  CreateTimeboxesApiType,
  MakeRequestType,
  TimeboxesApiType,
} from '../common';
import { asssertIsOfTimeboxType, asssertAreOfTimeboxType } from '../utilities';

export const createTimeboxesApi: CreateTimeboxesApiType = (config) => {
  const baseUrl = config?.baseUrl;

  let makeRequest: MakeRequestType = makeRequestViaFetch;
  if (config?.requestTool === 'axios') {
    makeRequest = makeRequestViaAxios;
  }

  const timeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId, accessToken) =>
      makeRequest({
        baseUrl,
        accessToken,
        method: 'GET',
        id: timeboxId,
      }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );

        return result;
      }),

    getTimeboxes: async (accessToken) =>
      makeRequest({ baseUrl, accessToken, method: 'GET' }).then((result) => {
        asssertAreOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );

        return result;
      }),

    getTimeboxesByFullTextSearch: async (searchQuery, accessToken) =>
      makeRequest({
        baseUrl,
        accessToken,
        method: 'GET',
        phrase: searchQuery,
      }).then((result) => {
        asssertAreOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );

        return result;
      }),

    addTimebox: async (addedTimeboxData, accessToken) =>
      makeRequest({
        baseUrl,
        accessToken,
        method: 'POST',
        data: addedTimeboxData,
      }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );
        return result;
      }),

    editTimebox: async (editedTimebox, accessToken) =>
      makeRequest({
        baseUrl,
        accessToken,
        method: 'PUT',
        data: editedTimebox,
      }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );
        return result;
      }),

    partiallyUpdateTimebox: async (partiallyUpdatedTimebox, accessToken) =>
      makeRequest({
        baseUrl,
        accessToken,
        method: 'PATCH',
        data: partiallyUpdatedTimebox,
      }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );
        return result;
      }),

    removeTimebox: async (removedTimeboxId, accessToken) =>
      makeRequest({
        baseUrl,
        accessToken,
        method: 'DELETE',
        id: removedTimeboxId,
      }),
  };

  return timeboxesApi;
};
