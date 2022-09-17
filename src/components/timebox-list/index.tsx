import React from 'react';
import './styles.scss';

interface TimeboxListInterface {
  renderTimeboxes: () => JSX.Element[];
}

export const TimeboxList: React.FC<TimeboxListInterface> = ({
  renderTimeboxes,
}) => {
  return <div className="timeboxesList">{renderTimeboxes()}</div>;
};
