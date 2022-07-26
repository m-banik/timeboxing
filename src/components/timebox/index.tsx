import React from 'react';
import {
  TimeboxType,
  EditableTimeboxHandlerType,
  InputChangeEventHandlerType,
} from '@Common/index';
import './styles.scss';

type TimeboxPropsType = {
  title: TimeboxType['title'];
  totalTimeInMinutes: TimeboxType['totalTimeInMinutes'];
  onEdit: EditableTimeboxHandlerType;
  onDelete: VoidFunction;
};

type TimeboxStateType = Omit<TimeboxType, 'id'>;

export class Timebox extends React.Component<
  TimeboxPropsType,
  TimeboxStateType
> {
  constructor(props: TimeboxPropsType) {
    super(props);
    this.state = {
      title: props.title,
      totalTimeInMinutes: props.totalTimeInMinutes,
    };
  }

  handleTitleChange: InputChangeEventHandlerType = (event) => {
    const title = event.target.value;
    this.setState({
      title,
    });
  };

  handleTotalTimeInMinutesChange: InputChangeEventHandlerType = (event) => {
    const totalTimeInMinutes = Number(event.target.value);
    this.setState({
      totalTimeInMinutes,
    });
  };

  handleEdit = () => {
    const editedTimebox = { ...this.state };
    this.props.onEdit(editedTimebox);
  };

  render() {
    const { title, totalTimeInMinutes } = this.state;
    const { onDelete } = this.props;

    const isEditable =
      title !== this.props.title ||
      totalTimeInMinutes !== this.props.totalTimeInMinutes;

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
