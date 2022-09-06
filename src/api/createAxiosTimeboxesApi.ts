import { makeRequestViaAxios } from '.';
import { CreateTimeboxesApiType, TimeboxesApiType } from '../common';
import { asssertIsOfTimeboxType, asssertAreOfTimeboxType } from '../utilities';

export const createAxiosTimeboxesApi: CreateTimeboxesApiType = (config) => {
  const baseUrl = config?.baseUrl;

  const timeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId, accessToken) =>
      makeRequestViaAxios({
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
      makeRequestViaAxios({ baseUrl, accessToken, method: 'GET' }).then(
        (result) => {
          asssertAreOfTimeboxType(
            result,
            'Server provided data of an incorrect format!'
          );

          return result;
        }
      ),

    getTimeboxesByFullTextSearch: async (searchQuery, accessToken) =>
      makeRequestViaAxios({
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
      makeRequestViaAxios({
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
      makeRequestViaAxios({
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
      makeRequestViaAxios({
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
      makeRequestViaAxios({
        baseUrl,
        accessToken,
        method: 'DELETE',
        id: removedTimeboxId,
      }),
  };

  return timeboxesApi;
};
