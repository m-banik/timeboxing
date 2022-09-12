import React from 'react';
import { TimeboxEditor } from '../timebox-editor';
import { CurrentTimebox } from '../current-timebox';
import {
  TimeboxDataType,
  InputChangeEventHandlerType,
} from '../../common/types';

type EditableTimeboxStateType = TimeboxDataType & { isConfirmed: boolean };

export class EditableTimebox extends React.Component<
  {},
  EditableTimeboxStateType
> {
  state = {
    title: 'Uczę się skrótów klawiszowych',
    totalTimeInMinutes: 25,
    isConfirmed: false,
  };

  handleTitleChange: InputChangeEventHandlerType = (event) =>
    this.setState({ title: event.target.value });

  handleTotalTimeInMinutesChange: InputChangeEventHandlerType = (event) => {
    const totalTimeInMinutes = Number(event.target.value);
    if (!isNaN(totalTimeInMinutes)) {
      this.setState({ totalTimeInMinutes });
    }
  };

  handleConfirmation = () =>
    this.setState((prevState) => ({ isConfirmed: !prevState.isConfirmed }));

  render() {
    const { title, totalTimeInMinutes, isConfirmed } = this.state;

    return isConfirmed ? (
      <CurrentTimebox
        title={title}
        totalTimeInMinutes={totalTimeInMinutes}
        isEditable={isConfirmed}
        onEdit={this.handleConfirmation}
      />
    ) : (
      <TimeboxEditor
        title={title}
        totalTimeInMinutes={totalTimeInMinutes}
        isEditable={!isConfirmed}
        onTitleChange={this.handleTitleChange}
        onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
        onConfirm={this.handleConfirmation}
      />
    );
  }
}
