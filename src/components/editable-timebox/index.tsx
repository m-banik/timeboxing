import React from 'react';
import { TimeboxEditor, CurrentTimebox } from '..';
import { EditableTimeboxType, InputChangeEventHandlerType } from '../../common';

type EditableTimeboxStateType = EditableTimeboxType & { isConfirmed: boolean };

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

    return (
      <>
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={!isConfirmed}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
          onConfirm={this.handleConfirmation}
        />
        <CurrentTimebox
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isConfirmed}
          onEdit={this.handleConfirmation}
        />
      </>
    );
  }
}
