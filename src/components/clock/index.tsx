import React from 'react';
import { normalizePositiveNumberByLimit } from '../../utils';
import './styles.scss';

type ClockPropsType = {
  className?: string;
  hours?: number;
  minutes?: number;
  seconds?: number;
  miliseconds?: number;
};

export const Clock: React.FC<ClockPropsType> = ({
  className = '',
  hours = 0,
  minutes = 0,
  seconds = 0,
  miliseconds = 0,
}) => {
  const [normHours, normMin, normSec, normMilSec] = [
    normalizePositiveNumberByLimit(hours),
    normalizePositiveNumberByLimit(minutes),
    normalizePositiveNumberByLimit(seconds),
    normalizePositiveNumberByLimit(miliseconds, 1000),
  ];
  const parsedHours = normHours < 10 ? '0' + normHours : normHours;
  const parsedMinutes = normMin < 10 ? '0' + normMin : normMin;
  const parsedSeconds = normSec < 10 ? '0' + normSec : normSec;

  let parsedMiliseconds;
  if (normMilSec < 100) {
    parsedMiliseconds = '0' + normMilSec;
  }

  if (normMilSec < 10) {
    parsedMiliseconds = '00' + normMilSec;
  }

  if (normMilSec >= 100) {
    parsedMiliseconds = normMilSec;
  }

  return (
    <h1 className={`clock ${className}`}>
      <span className="clock__hours">{parsedHours}</span>
      <span className="clock__separator--red">:</span>
      <span className="clock__minutes--orangered">{parsedMinutes}</span>
      <span className="clock__separator--green">:</span>
      <span className="clock__seconds--orangered">{parsedSeconds}</span>
      <span className="clock__separator--blue">:</span>
      <span className="clock__miliseconds">{parsedMiliseconds}</span>
    </h1>
  );
};
