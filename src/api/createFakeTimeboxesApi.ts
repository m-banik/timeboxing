import {
  CreateTimeboxesApiType,
  timeboxesSamples,
  IdType,
  TimeboxesApiType,
} from '../common';
import { wait } from '../utilities';

const checkAccessToken = (accessToken?: string): void => {
  if (typeof accessToken !== 'string') {
    throw new Error('Invalid token!');
  }
};

type CreateFakeTimeboxesApiConfigType = {
  delayInMiliseconds?: number;
};

type CreateFakeTimeboxesApiType =
  CreateTimeboxesApiType<CreateFakeTimeboxesApiConfigType>;

export const createFakeTimeboxesApi: CreateFakeTimeboxesApiType = (config) => {
  const delayInMiliseconds = config?.delayInMiliseconds || 1000;
  const timeboxes = [...timeboxesSamples];

  const getTimeboxIndexById = (searchedId: IdType) =>
    timeboxes.findIndex(({ id }) => searchedId === id);

  const FakeTimeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId, accessToken) => {
      await wait(delayInMiliseconds);
      checkAccessToken(accessToken);

      const searchedTimeboxIndex = getTimeboxIndexById(timeboxId);

      if (searchedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      return timeboxes[searchedTimeboxIndex];
    },

    getTimeboxes: async (accessToken) => {
      await wait(delayInMiliseconds);
      checkAccessToken(accessToken);

      return [...timeboxes];
    },

    getTimeboxesByFullTextSearch: async (searchQuery, accessToken) => {
      await wait(delayInMiliseconds);
      checkAccessToken(accessToken);

      const timeboxesByFullTextSearch = timeboxes.filter(({ title }) =>
        title.includes(searchQuery)
      );

      return timeboxesByFullTextSearch;
    },

    addTimebox: async (addedTimeboxData, accessToken) => {
      await wait(delayInMiliseconds);
      checkAccessToken(accessToken);

      const customId = Math.floor(
        Math.random() * 1000000000000 + timeboxes.length
      );

      const addedTimebox = { ...addedTimeboxData, id: customId };
      timeboxes.push({ ...addedTimebox });

      return addedTimebox;
    },

    editTimebox: async (editedTimebox, accessToken) => {
      await wait(delayInMiliseconds);
      checkAccessToken(accessToken);

      const editedTimeboxIndex = getTimeboxIndexById(editedTimebox.id);

      if (editedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      timeboxes[editedTimeboxIndex] = { ...editedTimebox };

      return editedTimebox;
    },

    partiallyUpdateTimebox: async (timeboxToUpdate, accessToken) => {
      await wait(delayInMiliseconds);
      checkAccessToken(accessToken);

      if (!timeboxToUpdate.id) {
        throw new Error('The provided timebox object has no ID key included!');
      }

      const editedTimeboxIndex = getTimeboxIndexById(timeboxToUpdate.id);

      if (editedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      const updatedTimebox = {
        ...timeboxes[editedTimeboxIndex],
        ...timeboxToUpdate,
      };

      timeboxes[editedTimeboxIndex] = { ...updatedTimebox };

      return updatedTimebox;
    },

    removeTimebox: async (removedTimeboxId, accessToken) => {
      await wait(delayInMiliseconds);
      checkAccessToken(accessToken);

      const removedTimeboxIndex = getTimeboxIndexById(removedTimeboxId);

      if (removedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      const removedTimebox = timeboxes.splice(removedTimeboxIndex, 1)[0];

      return removedTimebox;
    },
  };

  return FakeTimeboxesApi;
};
