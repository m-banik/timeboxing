import React from 'react';
import { TimeboxDataHandlerType } from '../../common';
import './styles.scss';

type TimeboxCreatorPropsType = {
  onCreate: TimeboxDataHandlerType;
};

export class TimeboxCreator extends React.Component<TimeboxCreatorPropsType> {
  constructor(props: TimeboxCreatorPropsType) {
    super(props);
    this.titleRef = React.createRef();
    this.totalTimeInMinutesRef = React.createRef();
  }

  titleRef: React.RefObject<HTMLInputElement>;
  totalTimeInMinutesRef: React.RefObject<HTMLInputElement>;

  handleSubmit: React.EventHandler<React.FormEvent> = (event) => {
    event.preventDefault();

    const title = this.titleRef.current?.value;
    const totalTimeInMinutes = Number(
      this.totalTimeInMinutesRef.current?.value
    );

    if (title !== undefined && !isNaN(totalTimeInMinutes)) {
      this.props.onCreate({
        title,
        totalTimeInMinutes,
      });

      this.resetInputs();
    }
  };

  resetInputs = () => {
    if (this.titleRef.current && this.totalTimeInMinutesRef.current) {
      this.titleRef.current.value = '';
      this.totalTimeInMinutesRef.current.value = '';
    }
  };

  render() {
    return (
      <form className={`TimeboxCreator`} onSubmit={this.handleSubmit}>
        <label>
          Co robisz?
          <input ref={this.titleRef} type="text" />
        </label>
        <br />
        <label>
          Ile minut?
          <input ref={this.totalTimeInMinutesRef} type="number" />
        </label>
        <br />
        <button>Dodaj timebox</button>
      </form>
    );
  }
}
