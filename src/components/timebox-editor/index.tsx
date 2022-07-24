import React from 'react';
import { TimeboxType, InputChangeEventHandlerType } from '@Common/types';
import './styles.css';

type TimeboxEditorPropsType = {
  title: TimeboxType['title'];
  totalTimeInMinutes: TimeboxType['totalTimeInMinutes'];
  isEditable: boolean;
  onTitleChange: InputChangeEventHandlerType;
  onTotalTimeInMinutesChange: InputChangeEventHandlerType;
  onConfirm: VoidFunction;
};

export const TimeboxEditor: React.FC<TimeboxEditorPropsType> = ({
  title,
  totalTimeInMinutes,
  isEditable,
  onTitleChange,
  onTotalTimeInMinutesChange,
  onConfirm,
}) => {
  return (
    <div className={`TimeboxEditor ${!isEditable ? 'inactive' : ''}`}>
      <label>
        Co robisz?
        <input
          disabled={!isEditable}
          value={title}
          type="text"
          onChange={onTitleChange}
        />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          disabled={!isEditable}
          value={totalTimeInMinutes}
          type="number"
          onChange={onTotalTimeInMinutesChange}
        />
      </label>
      <br />
      <button disabled={!isEditable} onClick={onConfirm}>
        Zatwierdź
      </button>
    </div>
  );
};
