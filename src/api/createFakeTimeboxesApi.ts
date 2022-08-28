import { TimeboxesApiType, timeboxesSamples, IdType } from '../common';
import { wait } from '../utilities';

type CreateFakeTimeboxesAPIConfigType = {
  delayInMiliseconds?: number;
};

type CreateFakeTimeboxesAPIType = (
  config: CreateFakeTimeboxesAPIConfigType
) => TimeboxesApiType;

export const createFakeTimeboxesAPI: CreateFakeTimeboxesAPIType = ({
  delayInMiliseconds,
}) => {
  const timeboxes = [...timeboxesSamples];

  const getTimeboxIndexById = (searchedId: IdType) =>
    timeboxes.findIndex(({ id }) => searchedId === id);

  const FakeTimeboxesApi: TimeboxesApiType = {
    getTimebox: async (timeboxId) => {
      await wait(delayInMiliseconds || 1000);

      const searchedTimeboxIndex = getTimeboxIndexById(timeboxId);

      if (searchedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      return timeboxes[searchedTimeboxIndex];
    },

    getTimeboxes: async () => {
      await wait(delayInMiliseconds || 1000);
      return [...timeboxes];
    },

    getTimeboxesByFullTextSearch: async (searchQuery) => {
      await wait(delayInMiliseconds || 1000);

      const timeboxesByFullTextSearch = timeboxes.filter(({ title }) =>
        title.includes(searchQuery)
      );

      return timeboxesByFullTextSearch;
    },

    addTimebox: async (addedTimeboxData) => {
      await wait(delayInMiliseconds || 1000);

      const customId = Math.floor(
        Math.random() * 1000000000000 + timeboxes.length
      );

      const addedTimebox = { ...addedTimeboxData, id: customId };
      timeboxes.push({ ...addedTimebox });

      return addedTimebox;
    },

    editTimebox: async (editedTimebox) => {
      await wait(delayInMiliseconds || 1000);

      const editedTimeboxIndex = getTimeboxIndexById(editedTimebox.id);

      if (editedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      timeboxes[editedTimeboxIndex] = { ...editedTimebox };

      return editedTimebox;
    },

    partiallyUpdateTimebox: async (timeboxToUpdate) => {
      await wait(delayInMiliseconds || 1000);

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

    removeTimebox: async (removedTimeboxId: IdType) => {
      await wait(delayInMiliseconds || 1000);

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
