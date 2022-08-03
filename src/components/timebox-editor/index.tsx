import React from 'react';
import CN from 'classnames';
import { TimeboxType, InputChangeEventHandlerType } from '@Common/types';
import './styles.scss';

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
  const classNames = CN('TimeboxEditor', { inactive: !isEditable });
  return (
    <div className={classNames}>
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
