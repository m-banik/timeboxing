import axios from 'axios';
import { TIMEBOXES_BASE_URL } from '.';
import { TimeboxesApiType } from '../common';
import { asssertIsOfTimeboxType, asssertAreOfTimeboxType } from '../utilities';

type CreateTimeboxesAPIConfigType = {
  baseUrl?: string;
};

type createAxiosTimeboxesApiType = (
  config?: CreateTimeboxesAPIConfigType
) => TimeboxesApiType;

export const createAxiosTimeboxesApi: createAxiosTimeboxesApiType = (
  config
) => {
  const baseUrl = config?.baseUrl || TIMEBOXES_BASE_URL;

  const TimeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId) =>
      axios.get(`${baseUrl}/${timeboxId}`).then(({ data }) => {
        asssertIsOfTimeboxType(
          data,
          'Server provided data of an incorrect format!'
        );

        return data;
      }),

    getTimeboxes: async () =>
      axios.get(baseUrl).then(({ data }) => {
        asssertAreOfTimeboxType(
          data,
          'Server provided data of an incorrect format!'
        );

        return data;
      }),

    getTimeboxesByFullTextSearch: async (searchQuery) =>
      axios
        .get(`${baseUrl}?q=${encodeURIComponent(searchQuery)}`)
        .then(({ data }) => {
          asssertAreOfTimeboxType(
            data,
            'Server provided data of an incorrect format!'
          );

          return data;
        }),

    addTimebox: async (addedTimeboxData) =>
      axios.post(baseUrl, addedTimeboxData).then(({ data }) => {
        asssertIsOfTimeboxType(
          data,
          'Server provided data of an incorrect format!'
        );
        return data;
      }),

    editTimebox: async (editedTimebox) =>
      axios.put(baseUrl, editedTimebox).then(({ data }) => {
        asssertIsOfTimeboxType(
          data,
          'Server provided data of an incorrect format!'
        );
        return data;
      }),

    partiallyUpdateTimebox: async (partiallyUpdatedTimebox) =>
      axios
        .patch(
          `${baseUrl}/${partiallyUpdatedTimebox.id}`,
          partiallyUpdatedTimebox
        )
        .then(({ data }) => {
          asssertIsOfTimeboxType(
            data,
            'Server provided data of an incorrect format!'
          );
          return data;
        }),

    removeTimebox: async (removedTimeboxId) =>
      axios.delete(`${baseUrl}/${removedTimeboxId}`),
  };

  return TimeboxesApi;
};
