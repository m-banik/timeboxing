import { ChangeEventHandler, MouseEventHandler } from 'react';
// ToDo: Changed due to the outer API
// import { nanoid } from 'nanoid';

export type IdType = number;
// export type IdType = ReturnType<typeof nanoid>;

export type TimeboxType = {
  id: IdType;
  title: string;
  totalTimeInMinutes: number;
};

export type TimeboxHandlerType = (timebox: TimeboxType) => void;

export type TimeboxDataType = Omit<TimeboxType, 'id'>;

export type PartialTimeboxType = Partial<TimeboxType> & { id: IdType };

export type TimeboxDataHandlerType = (timebox: TimeboxDataType) => void;

export type InputChangeEventHandlerType = ChangeEventHandler<HTMLInputElement>;

export type ButtonEventHandlerType = MouseEventHandler<HTMLButtonElement>;

export type TimeboxesApiType = {
  getTimebox: (timeboxId: IdType) => Promise<TimeboxType>;
  getTimeboxes: () => Promise<TimeboxType[]>;
  getTimeboxesByFullTextSearch: (searchQuery: string) => Promise<TimeboxType[]>;
  addTimebox: (addedTimeboxData: TimeboxDataType) => Promise<TimeboxType>;
  editTimebox: (editedTimebox: TimeboxType) => Promise<TimeboxType>;
  partiallyUpdateTimebox: (
    partiallyUpdatedTimebox: PartialTimeboxType
  ) => Promise<TimeboxType>;
  removeTimebox: (removedTimeboxId: IdType) => Promise<unknown>;
};
