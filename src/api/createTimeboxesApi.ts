import { makeRequestViaFetch } from './';
import { TimeboxesApiType } from '../common';
import { asssertIsOfTimeboxType, asssertAreOfTimeboxType } from '../utilities';

type CreateTimeboxesAPIConfigType = {
  baseUrl?: string;
};

type CreateTimeboxesAPIType = (
  config?: CreateTimeboxesAPIConfigType
) => TimeboxesApiType;

export const createTimeboxesAPI: CreateTimeboxesAPIType = (config) => {
  const baseUrl = config?.baseUrl;

  const TimeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId) =>
      makeRequestViaFetch({ baseUrl, method: 'GET', data: timeboxId }).then(
        (result) => {
          asssertIsOfTimeboxType(
            result,
            'Server provided data of an incorrect format!'
          );

          return result;
        }
      ),

    getTimeboxes: async () =>
      makeRequestViaFetch({ baseUrl, method: 'GET' }).then((result) => {
        asssertAreOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );

        return result;
      }),

    addTimebox: async (addedTimeboxData) =>
      makeRequestViaFetch({
        baseUrl,
        method: 'POST',
        data: addedTimeboxData,
      }).then((result) => {
        console.log(result);
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );
        return result;
      }),

    editTimebox: async (editedTimebox) =>
      makeRequestViaFetch({ baseUrl, method: 'PUT', data: editedTimebox }).then(
        (result) => {
          asssertIsOfTimeboxType(
            result,
            'Server provided data of an incorrect format!'
          );
          return result;
        }
      ),

    partiallyUpdateTimebox: async (partiallyUpdatedTimebox) =>
      makeRequestViaFetch({
        baseUrl,
        method: 'PATCH',
        data: partiallyUpdatedTimebox,
      }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );
        return result;
      }),

    removeTimebox: async (removedTimeboxId) =>
      makeRequestViaFetch({
        baseUrl,
        method: 'DELETE',
        data: removedTimeboxId,
      }),
  };

  return TimeboxesApi;
};
