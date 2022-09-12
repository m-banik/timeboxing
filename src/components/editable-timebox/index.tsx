import React from 'react';
import { TimeboxEditor } from '../timebox-editor';
import { CurrentTimebox } from '../current-timebox';
import {
  TimeboxDataType,
  InputChangeEventHandlerType,
} from '../../common/types';

type EditableTimeboxStateType = TimeboxDataType & { isConfirmed: boolean };

const initialState: EditableTimeboxStateType = {
  title: 'Uczę się skrótów klawiszowych',
  totalTimeInMinutes: 25,
  isConfirmed: false,
};

export const EditableTimebox: React.FC = () => {
  const [state, setState] = React.useState(initialState);

  const handleTitleChange = React.useCallback<InputChangeEventHandlerType>(
    (event) =>
      setState((prevState) => ({ ...prevState, title: event.target.value })),
    [setState]
  );

  const handleTotalTimeInMinutesChange =
    React.useCallback<InputChangeEventHandlerType>(
      (event) => {
        const totalTimeInMinutes = Number(event.target.value);
        if (!isNaN(totalTimeInMinutes)) {
          setState((prevState) => ({ ...prevState, totalTimeInMinutes }));
        }
      },
      [setState]
    );

  const handleConfirmation = React.useCallback(
    () =>
      setState((prevState) => ({
        ...prevState,
        isConfirmed: !prevState.isConfirmed,
      })),
    [setState]
  );

  const { title, totalTimeInMinutes, isConfirmed } = state;

  return isConfirmed ? (
    <CurrentTimebox
      title={title}
      totalTimeInMinutes={totalTimeInMinutes}
      isEditable={isConfirmed}
      onEdit={handleConfirmation}
    />
  ) : (
    <TimeboxEditor
      title={title}
      totalTimeInMinutes={totalTimeInMinutes}
      isEditable={!isConfirmed}
      onTitleChange={handleTitleChange}
      onTotalTimeInMinutesChange={handleTotalTimeInMinutesChange}
      onConfirm={handleConfirmation}
    />
  );
};
