import React from 'react';
import CN from 'classnames';
import { Clock } from '../clock';
import { ProgressBar } from '../progress-bar';
import { TimeboxType, ButtonEventHandlerType } from '../../common/types';
import { getMinutesAndSecondsFromDurationInSeconds } from '../../utilities/getMinutesAndSecondsFromDurationInSeconds';
import './styles.scss';

type CurrentTimeboxPropsType = {
  title: TimeboxType['title'];
  totalTimeInMinutes: TimeboxType['totalTimeInMinutes'];
  isEditable: boolean;
  onEdit: VoidFunction;
};

const initialState = {
  isRunning: false,
  isPaused: false,
  pausesCount: 0,
  elapsedTimeInSeconds: 0,
};

type IntervalRefType = {
  id?: number;
  shouldBeRunning?: boolean;
};

export const CurrentTimebox: React.FC<CurrentTimeboxPropsType> = ({
  title,
  totalTimeInMinutes,
  isEditable,
  onEdit,
}) => {
  const [state, setState] = React.useState(initialState);
  const intervalRef = React.useRef<IntervalRefType>({});

  const handleEdit = React.useCallback<ButtonEventHandlerType>(() => {
    onEdit();
    intervalRef.current.shouldBeRunning = false;
  }, [onEdit]);

  const handleStart = React.useCallback<ButtonEventHandlerType>(() => {
    setState((prevState) => ({ ...prevState, isRunning: true }));
    intervalRef.current.shouldBeRunning = true;
  }, []);

  const handleStop = React.useCallback<ButtonEventHandlerType>(() => {
    setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });

    intervalRef.current.shouldBeRunning = false;
  }, []);

  const handlePause = React.useCallback<ButtonEventHandlerType>(() => {
    setState((prevState) => {
      const isPaused = !prevState.isPaused;
      const pausesCount = prevState.pausesCount;

      intervalRef.current.shouldBeRunning = isPaused ? false : true;

      return {
        ...prevState,
        isPaused,
        pausesCount: isPaused ? pausesCount + 1 : pausesCount,
      };
    });
  }, []);

  const { isRunning, isPaused, pausesCount, elapsedTimeInSeconds } = state;
  const classNames = CN('CurrentTimebox', { inactive: !isEditable });
  const totalTimeInSeconds = totalTimeInMinutes * 60;
  const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
  const [minutesLeft, secondsLeft] =
    getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
  const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

  if (elapsedTimeInSeconds >= totalTimeInSeconds) {
    intervalRef.current.shouldBeRunning = false;
  }

  const stopTimer = React.useCallback(
    () => window.clearInterval(intervalRef.current.id),
    []
  );

  const startTimer = React.useCallback(() => {
    if (intervalRef.current.id) {
      stopTimer();
    }

    intervalRef.current.id = window.setInterval(
      () =>
        setState((prevState) => ({
          ...prevState,
          elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
        })),
      1000
    );
  }, [stopTimer]);

  React.useEffect(() => {
    if (
      intervalRef.current.id === undefined &&
      intervalRef.current.shouldBeRunning === undefined
    ) {
      return;
    }

    intervalRef.current.shouldBeRunning ? startTimer() : stopTimer();
  }, [
    intervalRef.current.id,
    intervalRef.current.shouldBeRunning,
    startTimer,
    stopTimer,
  ]);

  React.useEffect(
    () => () => stopTimer(),
    //eslint-disable-next-line
    []
  );

  return (
    <div className={classNames}>
      <h1>{title}</h1>
      <Clock minutes={minutesLeft} seconds={secondsLeft} />
      <ProgressBar
        className={isPaused ? 'inactive' : ''}
        percent={progressInPercent}
      />
      <button disabled={!isEditable} onClick={handleEdit}>
        Edytuj
      </button>
      <button disabled={!isEditable || isRunning} onClick={handleStart}>
        Start
      </button>
      <button disabled={!isRunning} onClick={handleStop}>
        Stop
      </button>
      <button disabled={!isRunning} onClick={handlePause}>
        {isPaused ? 'Wznów' : 'Pauzuj'}
      </button>
      Liczba przerw: {pausesCount}
    </div>
  );
};
