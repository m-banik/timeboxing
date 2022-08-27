import { makeRequestViaFetch } from './';
import { TimeboxesApiType } from '../common';
import { asssertIsOfTimeboxType, asssertAreOfTimeboxType } from '../utilities';

type CreateTimeboxesAPIType = () => TimeboxesApiType;

export const createTimeboxesAPI: CreateTimeboxesAPIType = () => {
  const TimeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId) =>
      makeRequestViaFetch({ method: 'GET', data: timeboxId }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );

        return result;
      }),

    getTimeboxes: async () =>
      makeRequestViaFetch({ method: 'GET' }).then((result) => {
        asssertAreOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );

        return result;
      }),

    addTimebox: async (addedTimeboxData) =>
      makeRequestViaFetch({
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
      makeRequestViaFetch({
        method: 'PUT',
        data: editedTimebox,
      }).then((result) => {
        asssertIsOfTimeboxType(
          result,
          'Server provided data of an incorrect format!'
        );
        return result;
      }),

    partiallyUpdateTimebox: async (partiallyUpdatedTimebox) =>
      makeRequestViaFetch({
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
        method: 'DELETE',
        data: removedTimeboxId,
      }),
  };

  return TimeboxesApi;
};
