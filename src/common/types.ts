import { ChangeEventHandler, MouseEventHandler } from 'react';
import { nanoid } from 'nanoid';

export type IdType = ReturnType<typeof nanoid>;

export type TimeboxType = {
  id: IdType;
  title: string;
  totalTimeInMinutes: number;
};

export type TimeboxHandlerType = (timebox: TimeboxType) => void;

export type TimeboxDataType = Omit<TimeboxType, 'id'>;

export type TimeboxDataHandlerType = (timebox: TimeboxDataType) => void;

export type InputChangeEventHandlerType = ChangeEventHandler<HTMLInputElement>;

export type ButtonEventHandlerType = MouseEventHandler<HTMLButtonElement>;
