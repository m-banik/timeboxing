import React from 'react';
import { TimeboxType, IdType } from '../../common/types';
import './styles.scss';

interface TimeboxInterface {
  timebox: TimeboxType;
  onEdit: (editedTimeboxId: IdType) => void;
  onDelete: (removedTimeboxId: IdType) => void;
}

export const Timebox: React.FC<TimeboxInterface> = ({
  timebox,
  onEdit,
  onDelete,
}) => {
  const { title, totalTimeInMinutes } = timebox;

  const onEditClick = React.useCallback(
    () => onEdit(timebox.id),
    [timebox.id, onEdit]
  );

  const onDeleteClick = React.useCallback(
    () => onDelete(timebox.id),
    [timebox.id, onDelete]
  );

  return (
    <div className={'timebox'}>
      <h3>
        <span>{title}</span> - <span>{totalTimeInMinutes}</span>
        min.
      </h3>
      <div>
        <button onClick={onEditClick}>Edytuj</button>
        <button onClick={onDeleteClick}>Usuń</button>
      </div>
    </div>
  );
};
