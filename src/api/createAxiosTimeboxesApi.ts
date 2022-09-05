import axios, { AxiosRequestConfig } from 'axios';
import { TIMEBOXES_BASE_URL } from '.';
import { CreateTimeboxesApiType, TimeboxesApiType } from '../common';
import { asssertIsOfTimeboxType, asssertAreOfTimeboxType } from '../utilities';

const createRequestConfig = (accessToken?: string) => {
  const requestConfig: AxiosRequestConfig = {};
  if (typeof accessToken === 'string') {
    requestConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return requestConfig;
};

export const createAxiosTimeboxesApi: CreateTimeboxesApiType = (config) => {
  const baseUrl = config?.baseUrl || TIMEBOXES_BASE_URL;

  const TimeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId, accessToken) =>
      axios
        .get(`${baseUrl}/${timeboxId}`, createRequestConfig(accessToken))
        .then(({ data }) => {
          asssertIsOfTimeboxType(
            data,
            'Server provided data of an incorrect format!'
          );

          return data;
        }),
    getTimeboxes: async (accessToken) =>
      axios.get(baseUrl, createRequestConfig(accessToken)).then(({ data }) => {
        asssertAreOfTimeboxType(
          data,
          'Server provided data of an incorrect format!'
        );

        return data;
      }),

    getTimeboxesByFullTextSearch: async (searchQuery, accessToken) =>
      axios
        .get(
          `${baseUrl}?q=${encodeURIComponent(searchQuery)}`,
          createRequestConfig(accessToken)
        )
        .then(({ data }) => {
          asssertAreOfTimeboxType(
            data,
            'Server provided data of an incorrect format!'
          );

          return data;
        }),

    addTimebox: async (addedTimeboxData, accessToken) =>
      axios
        .post(baseUrl, addedTimeboxData, createRequestConfig(accessToken))
        .then(({ data }) => {
          asssertIsOfTimeboxType(
            data,
            'Server provided data of an incorrect format!'
          );
          return data;
        }),

    editTimebox: async (editedTimebox, accessToken) =>
      axios
        .put(baseUrl, editedTimebox, createRequestConfig(accessToken))
        .then(({ data }) => {
          asssertIsOfTimeboxType(
            data,
            'Server provided data of an incorrect format!'
          );
          return data;
        }),

    partiallyUpdateTimebox: async (partiallyUpdatedTimebox, accessToken) =>
      axios
        .patch(
          `${baseUrl}/${partiallyUpdatedTimebox.id}`,
          partiallyUpdatedTimebox,
          createRequestConfig(accessToken)
        )
        .then(({ data }) => {
          asssertIsOfTimeboxType(
            data,
            'Server provided data of an incorrect format!'
          );
          return data;
        }),

    removeTimebox: async (removedTimeboxId, accessToken) =>
      axios.delete(
        `${baseUrl}/${removedTimeboxId}`,
        createRequestConfig(accessToken)
      ),
  };

  return TimeboxesApi;
};
