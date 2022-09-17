import React from 'react';
import { TimeboxType } from '../../common/types';
import './styles.scss';

interface ReadOnlyTimeboxInterface {
  timebox: TimeboxType;
}

export const ReadOnlyTimebox: React.FC<ReadOnlyTimeboxInterface> = ({
  timebox,
}) => {
  const { title, totalTimeInMinutes } = timebox;

  return (
    <div className={'readOnlyTimebox'}>
      <h3>
        <span>{title}</span> - <span>{totalTimeInMinutes}</span>
        min.
      </h3>
    </div>
  );
};
