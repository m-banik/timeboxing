import React from 'react';
import { TimeboxCreator, Timebox } from '..';
import {
  TimeboxType,
  timeboxesSamples,
  TimeboxHandlerType,
  IdType,
  EditableTimeboxType,
} from '../../common';

type TimeboxListStateType = {
  timeboxes: TimeboxType[];
};

export class TimeboxList extends React.Component<{}, TimeboxListStateType> {
  state = {
    timeboxes: timeboxesSamples,
  };

  addTimebox: TimeboxHandlerType = (addedTimebox) => {
    this.setState((prevState) => {
      const timeboxes = [...prevState.timeboxes, addedTimebox];
      return { timeboxes };
    });
  };

  removeTimebox = (idToRemove: IdType) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox) => timebox.id !== idToRemove
      );
      return { timeboxes };
    });
  };

  updateTimebox = (idToUpdate: IdType, updatedTimebox: EditableTimeboxType) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox) =>
        timebox.id === idToUpdate ? { ...timebox, ...updatedTimebox } : timebox
      );
      return { timeboxes };
    });
  };

  handleCreate: TimeboxHandlerType = (createdTimebox) => {
    this.addTimebox(createdTimebox);
  };

  render() {
    const { timeboxes } = this.state;

    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />
        {timeboxes.map((timebox) => (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(timebox.id)}
            onEdit={(editedTimebox) =>
              this.updateTimebox(timebox.id, editedTimebox)
            }
          />
        ))}
      </>
    );
  }
}
