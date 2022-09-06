import { createAxiosTimeboxesApi, createFetchTimeboxesApi } from '.';
import {
  CreateReplaceableTimeboxesApiType,
  ReplaceableTimeboxesApiType,
} from '../common/index';

export const createTimeboxesApi: CreateReplaceableTimeboxesApiType = (
  config
) => {
  const axiosTimeboxesApi = createAxiosTimeboxesApi(config);
  const fetchTimeboxesApi = createFetchTimeboxesApi(config);

  const replaceableTimeboxesApi: ReplaceableTimeboxesApiType = {
    getTimebox: async (requestToolKind, timeboxId, accessToken) =>
      requestToolKind === 'axios'
        ? axiosTimeboxesApi.getTimebox(timeboxId, accessToken)
        : fetchTimeboxesApi.getTimebox(timeboxId, accessToken),

    getTimeboxes: async (requestToolKind, accessToken) =>
      requestToolKind === 'axios'
        ? axiosTimeboxesApi.getTimeboxes(accessToken)
        : fetchTimeboxesApi.getTimeboxes(accessToken),

    getTimeboxesByFullTextSearch: async (
      requestToolKind,
      searchQuery: string,
      accessToken
    ) => {
      const timeboxesApi =
        requestToolKind === 'axios' ? axiosTimeboxesApi : fetchTimeboxesApi;

      return timeboxesApi.getTimeboxesByFullTextSearch(
        searchQuery,
        accessToken
      );
    },

    addTimebox: async (requestToolKind, addedTimeboxData, accessToken) =>
      requestToolKind === 'axios'
        ? axiosTimeboxesApi.addTimebox(addedTimeboxData, accessToken)
        : fetchTimeboxesApi.addTimebox(addedTimeboxData, accessToken),

    editTimebox: async (requestToolKind, editedTimebox, accessToken) =>
      requestToolKind === 'axios'
        ? axiosTimeboxesApi.editTimebox(editedTimebox, accessToken)
        : fetchTimeboxesApi.editTimebox(editedTimebox, accessToken),

    partiallyUpdateTimebox: async (
      requestToolKind,
      partiallyUpdatedTimebox,
      accessToken
    ) => {
      const timeboxesApi =
        requestToolKind === 'axios' ? axiosTimeboxesApi : fetchTimeboxesApi;

      return timeboxesApi.partiallyUpdateTimebox(
        partiallyUpdatedTimebox,
        accessToken
      );
    },

    removeTimebox: async (requestToolKind, removedTimeboxId, accessToken) =>
      requestToolKind === 'axios'
        ? axiosTimeboxesApi.removeTimebox(removedTimeboxId, accessToken)
        : fetchTimeboxesApi.removeTimebox(removedTimeboxId, accessToken),
  };

  return replaceableTimeboxesApi;
};
