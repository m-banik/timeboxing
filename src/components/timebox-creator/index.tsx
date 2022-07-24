import React from 'react';
import { TimeboxHandlerType } from '../../common';
import { nanoid } from '../../utils';
import './styles.css';

type TimeboxCreatorPropsType = {
  onCreate: TimeboxHandlerType;
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
        id: nanoid(),
        title,
        totalTimeInMinutes,
      });
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
