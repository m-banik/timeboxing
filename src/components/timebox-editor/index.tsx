import React from 'react';
import {
  TimeboxType,
  TimeboxHandlerType,
  InputChangeEventHandlerType,
} from '../../common/types';
import './styles.scss';

type TimeboxEditorPropsType = {
  timebox: TimeboxType;
  onCancel: VoidFunction;
  onEdit: TimeboxHandlerType;
};

export const TimeboxEditor: React.FC<TimeboxEditorPropsType> = ({
  timebox,
  onCancel,
  onEdit,
}) => {
  const { title, totalTimeInMinutes } = timebox;

  const [editedTitle, setEditedTitle] = React.useState(title);
  const [editedTotalTimeInMinutes, setEditedTotalTimeInMinutes] =
    React.useState(totalTimeInMinutes);

  const isEditable = React.useMemo(() => {
    const areTitlesTheSame = title === editedTitle;
    const areTotalTimesTheSame =
      totalTimeInMinutes === editedTotalTimeInMinutes;

    return !areTitlesTheSame || !areTotalTimesTheSame;
  }, [title, editedTitle, totalTimeInMinutes, editedTotalTimeInMinutes]);

  const onTitleChange = React.useCallback<InputChangeEventHandlerType>(
    (event) => {
      const { value } = event.target;

      setEditedTitle(value);
    },
    []
  );

  const onTotalTimeInMinutesChange =
    React.useCallback<InputChangeEventHandlerType>((event) => {
      const { value } = event.target;

      const valueAsNumber = Number(value);

      if (!isNaN(valueAsNumber)) {
        setEditedTotalTimeInMinutes(valueAsNumber);
      }
    }, []);

  const onConfirm = React.useCallback(() => {
    const editedTimebox = {
      id: timebox.id,
      title: editedTitle,
      totalTimeInMinutes: editedTotalTimeInMinutes,
    };

    onEdit(editedTimebox);
    onCancel();
  }, [timebox.id, editedTitle, editedTotalTimeInMinutes, onEdit, onCancel]);

  return (
    <div className={'timeboxEditor'}>
      <label>
        Co robisz?
        <input value={editedTitle} type="text" onChange={onTitleChange} />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          value={editedTotalTimeInMinutes}
          type="number"
          onChange={onTotalTimeInMinutesChange}
        />
      </label>
      <br />
      <button className="timeboxEditor__button" onClick={onCancel}>
        Anuluj
      </button>
      <button
        className="timeboxEditor__button"
        disabled={!isEditable}
        onClick={onConfirm}
      >
        Zatwierdź
      </button>
    </div>
  );
};
