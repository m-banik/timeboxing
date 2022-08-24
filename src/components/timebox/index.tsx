import React from 'react';
import {
  TimeboxType,
  TimeboxHandlerType,
  TimeboxDataType,
  InputChangeEventHandlerType,
} from '@Common/index';
import './styles.scss';

type TimeboxPropsType = {
  timebox: TimeboxType;
  onEdit: TimeboxHandlerType;
  onDelete: VoidFunction;
};

type TimeboxStateType = TimeboxDataType;

export class Timebox extends React.Component<
  TimeboxPropsType,
  TimeboxStateType
> {
  constructor(props: TimeboxPropsType) {
    super(props);

    const { timebox } = this.props;

    this.state = {
      title: timebox.title,
      totalTimeInMinutes: timebox.totalTimeInMinutes,
    };
  }

  handleTitleChange: InputChangeEventHandlerType = (event) => {
    const title = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      title,
    }));
  };

  handleTotalTimeInMinutesChange: InputChangeEventHandlerType = (event) => {
    const totalTimeInMinutes = Number(event.target.value);
    this.setState((prevState) => ({ ...prevState, totalTimeInMinutes }));
  };

  handleEdit = () => {
    const { timebox } = this.props;
    const editedTimebox = { ...this.state, id: timebox.id };
    this.props.onEdit(editedTimebox);
  };

  render() {
    const { title, totalTimeInMinutes } = this.state;
    const { timebox, onDelete } = this.props;

    const isEditable =
      title !== timebox.title ||
      totalTimeInMinutes !== timebox.totalTimeInMinutes;

    return (
      <div className={'Timebox'}>
        <h3>
          <input value={title} type="text" onChange={this.handleTitleChange} />{' '}
          -
          <input
            value={totalTimeInMinutes}
            type="number"
            onChange={this.handleTotalTimeInMinutesChange}
          />
          min.
        </h3>
        <button onClick={onDelete}>Usuń</button>
        <button disabled={!isEditable} onClick={this.handleEdit}>
          Zmień
        </button>
        <input />
      </div>
    );
  }
}
