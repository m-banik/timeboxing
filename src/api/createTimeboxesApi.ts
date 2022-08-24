import {
  timeboxesSamples,
  IdType,
  TimeboxDataType,
  TimeboxType,
} from '../common';
import { wait, nanoid } from '../utilities';

type CreateTimeboxesAPIConfigType = {
  delayInMiliseconds?: number;
};

type FakeTimeboxesApiType = {
  getTimeboxes: () => Promise<TimeboxType[]>;
  addTimebox: (addedTimeboxData: TimeboxDataType) => Promise<TimeboxType>;
  editTimebox: (editedTimebox: TimeboxType) => Promise<TimeboxType>;
  partiallyUpdateTimebox: (
    timeboxToUpdate: Partial<TimeboxType>
  ) => Promise<TimeboxType>;
  removeTimebox: (removedTimeboxId: IdType) => Promise<TimeboxType>;
};

type CreateTimeboxesAPIType = (
  config: CreateTimeboxesAPIConfigType
) => FakeTimeboxesApiType;

export const createTimeboxesAPI: CreateTimeboxesAPIType = ({
  delayInMiliseconds,
}) => {
  const timeboxes = [...timeboxesSamples];

  const getTimeboxIndexById = (searchedId: IdType) =>
    timeboxes.findIndex(({ id }) => searchedId === id);

  const FakeTimeboxesApi: FakeTimeboxesApiType = {
    getTimeboxes: async () => {
      await wait(delayInMiliseconds || 1000);
      return [...timeboxes];
    },
    addTimebox: async (addedTimeboxData: TimeboxDataType) => {
      await wait(delayInMiliseconds || 1000);

      const addedTimebox = { ...addedTimeboxData, id: nanoid() };
      timeboxes.push({ ...addedTimebox });

      return addedTimebox;
    },
    editTimebox: async (editedTimebox: TimeboxType) => {
      await wait(delayInMiliseconds || 1000);

      const editedTimeboxIndex = getTimeboxIndexById(editedTimebox.id);

      if (editedTimeboxIndex < 0) {
        throw new Error('There is no timebox of such ID!');
      }

      timeboxes[editedTimeboxIndex] = { ...editedTimebox };

      return editedTimebox;
    },
    partiallyUpdateTimebox: async (timeboxToUpdate: Partial<TimeboxType>) => {
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
