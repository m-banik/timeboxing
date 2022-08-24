import {
  timeboxesSamples,
  IdType,
  TimeboxDataType,
  TimeboxType,
} from '../common';
import { wait, nanoid } from '../utilities';

const timeboxes = [...timeboxesSamples];

const getTimeboxIndexById = (searchedId: IdType) =>
  timeboxes.findIndex(({ id }) => searchedId === id);

export const FakeTimeboxesApi = {
  getTimeboxes: async () => {
    await wait(1000);
    return [...timeboxes];
  },
  addTimebox: async (addedTimeboxData: TimeboxDataType) => {
    await wait(1000);

    const addedTimebox = { ...addedTimeboxData, id: nanoid() };
    timeboxes.push({ ...addedTimebox });

    return addedTimebox;
  },
  editTimebox: async (editedTimebox: TimeboxType) => {
    await wait(1000);

    const editedTimeboxIndex = getTimeboxIndexById(editedTimebox.id);

    if (editedTimeboxIndex < 0) {
      throw new Error('There is no timebox of such ID!');
    }

    timeboxes[editedTimeboxIndex] = { ...editedTimebox };

    return editedTimebox;
  },
  removeTimebox: async (removedTimeboxId: IdType) => {
    await wait(1000);

    const removedTimeboxIndex = getTimeboxIndexById(removedTimeboxId);

    if (removedTimeboxIndex < 0) {
      throw new Error('There is no timebox of such ID!');
    }

    const removedTimebox = timeboxes.splice(removedTimeboxIndex, 1)[0];

    return removedTimebox;
  },
};
