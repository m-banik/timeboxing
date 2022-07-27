import React from 'react';
import { Clock, ProgressBar } from '..';
import { TimeboxType, ButtonEventHandlerType } from '../../common';
import './styles.scss';

type CurrentTimeboxPropsType = {
  title: TimeboxType['title'];
  totalTimeInMinutes: TimeboxType['totalTimeInMinutes'];
  isEditable: boolean;
  onEdit: VoidFunction;
};

type CurrentTimeboxStateType = {
  isRunning: boolean;
  isPaused: boolean;
  pausesCount: number;
  elapsedTimeInSeconds: number;
};

export class CurrentTimebox extends React.Component<
  CurrentTimeboxPropsType,
  CurrentTimeboxStateType
> {
  constructor(props: CurrentTimeboxPropsType) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    };
  }

  intervalId: number | undefined;

  startTimer = () => {
    if (this.intervalId) {
      this.stopTimer();
    }

    this.intervalId = window.setInterval(
      () =>
        this.setState((prevState) => ({
          elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
        })),
      1000
    );
  };

  stopTimer = () => window.clearInterval(this.intervalId);

  handleEdit: ButtonEventHandlerType = (event) => {
    this.props.onEdit();
    this.stopTimer();
  };

  handleStart: ButtonEventHandlerType = (event) => {
    this.setState({ isRunning: true });
    this.startTimer();
  };

  handleStop: ButtonEventHandlerType = (event) => {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });

    this.stopTimer();
  };

  handlePause: ButtonEventHandlerType = (event) => {
    this.setState((prevState) => {
      const isPaused = !prevState.isPaused;
      const pausesCount = prevState.pausesCount;

      if (isPaused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }

      return {
        isPaused,
        pausesCount: isPaused ? pausesCount + 1 : pausesCount,
      };
    });
  };

  render() {
    const { isRunning, isPaused, pausesCount, elapsedTimeInSeconds } =
      this.state;
    const { title, totalTimeInMinutes, isEditable } = this.props;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    const progressInPercent =
      (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

    if (elapsedTimeInSeconds >= totalTimeInSeconds) {
      this.stopTimer();
    }

    return (
      <div className={`CurrentTimebox ${!isEditable ? 'inactive' : ''}`}>
        <h1>{title}</h1>
        <Clock minutes={minutesLeft} seconds={secondsLeft} />
        <ProgressBar
          className={isPaused ? 'inactive' : ''}
          percent={progressInPercent}
        />
        <button disabled={!isEditable} onClick={this.handleEdit}>
          Edytuj
        </button>
        <button disabled={!isEditable || isRunning} onClick={this.handleStart}>
          Start
        </button>
        <button disabled={!isRunning} onClick={this.handleStop}>
          Stop
        </button>
        <button disabled={!isRunning} onClick={this.handlePause}>
          {isPaused ? 'Wznów' : 'Pauzuj'}
        </button>
        Liczba przerw: {pausesCount}
      </div>
    );
  }
}
