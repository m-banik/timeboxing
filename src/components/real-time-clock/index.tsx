import React from 'react';
import { Clock } from '../clock';

type RealTimeClockStateType = {
  hours: number;
  minutes: number;
  seconds: number;
  miliseconds: number;
};

export class RealTimeClock extends React.Component<{}, RealTimeClockStateType> {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,
  };

  intervalId: number | undefined;

  setCurrentTime = () => {
    const currentTime = new Date();
    const newState: RealTimeClockStateType = {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      miliseconds: currentTime.getMilliseconds(),
    };

    this.setState(newState);
  };

  startTimer = () => {
    this.intervalId = window.setInterval(this.setCurrentTime, 1);
  };

  stopTimer = () => this.intervalId && window.clearInterval(this.intervalId);

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    return <Clock {...this.state} />;
  }
}
