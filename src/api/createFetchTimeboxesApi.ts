import { makeRequestViaFetch } from '.';
import { TimeboxesApiType } from '../common';
import { asssertIsOfTimeboxType, asssertAreOfTimeboxType } from '../utilities';

type CreateFetchTimeboxesAPIConfigType = {
  baseUrl?: string;
};

type CreateFetchTimeboxesApiType = (
  config?: CreateFetchTimeboxesAPIConfigType
) => TimeboxesApiType;

export const createFetchTimeboxesApi: CreateFetchTimeboxesApiType = (
  config
) => {
  const baseUrl = config?.baseUrl;

  const TimeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId, accessToken) =>
      makeRequestViaFetch({
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
      makeRequestViaFetch({ baseUrl, accessToken, method: 'GET' }).then(
        (result) => {
          asssertAreOfTimeboxType(
            result,
            'Server provided data of an incorrect format!'
          );

          return result;
        }
      ),

    getTimeboxesByFullTextSearch: async (searchQuery, accessToken) =>
      makeRequestViaFetch({
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
      makeRequestViaFetch({
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
      makeRequestViaFetch({
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
      makeRequestViaFetch({
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
      makeRequestViaFetch({
        baseUrl,
        accessToken,
        method: 'DELETE',
        id: removedTimeboxId,
      }),
  };

  return TimeboxesApi;
};
