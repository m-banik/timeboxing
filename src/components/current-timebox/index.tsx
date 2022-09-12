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

  componentWillUnmount() {
    this.intervalId && this.stopTimer();
  }

  render() {
    const { isRunning, isPaused, pausesCount, elapsedTimeInSeconds } =
      this.state;
    const { title, totalTimeInMinutes, isEditable } = this.props;
    const classNames = CN('CurrentTimebox', { inactive: !isEditable });
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const [minutesLeft, secondsLeft] =
      getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
    const progressInPercent =
      (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

    if (elapsedTimeInSeconds >= totalTimeInSeconds) {
      this.stopTimer();
    }

    return (
      <div className={classNames}>
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
