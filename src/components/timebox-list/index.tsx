import { TimeboxType, IdType, TimeboxHandlerType } from '@Common/types';
import React from 'react';
import { LoadingSpinner } from '../loading-spinner';
import './styles.scss';

const Timebox = React.lazy(() =>
  import('../timebox').then(({ Timebox }) => ({ default: Timebox }))
);

interface TimeboxListInterface {
  timeboxes: TimeboxType[];
  onDeleteTimebox: (removedTimeboxId: IdType) => void;
  onUpdateTimebox: TimeboxHandlerType;
}

export const TimeboxList: React.FC<TimeboxListInterface> = ({
  timeboxes,
  onDeleteTimebox,
  onUpdateTimebox,
}) => {
  return (
    <>
      {timeboxes.map((timebox) => (
        <React.Suspense
          key={timebox.id}
          fallback={<LoadingSpinner fullWidth />}
        >
          <Timebox
            timebox={timebox}
            onDelete={() => onDeleteTimebox(timebox.id)}
            onEdit={onUpdateTimebox}
          />
        </React.Suspense>
      ))}
      ;
    </>
  );
};
