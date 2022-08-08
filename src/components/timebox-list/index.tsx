import React from 'react';
import { TimeboxCreator, ErrorMessage, Timebox } from '..';
import {
  TimeboxType,
  timeboxesSamples,
  TimeboxHandlerType,
  IdType,
  EditableTimeboxType,
} from '../../common';

type TimeboxListStateType = {
  hasError: boolean;
  timeboxes: TimeboxType[];
};

export class TimeboxList extends React.Component<{}, TimeboxListStateType> {
  state = {
    hasError: false,
    timeboxes: timeboxesSamples,
  };

  addTimebox: TimeboxHandlerType = (addedTimebox) => {
    // throw new Error();
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
    try {
      this.addTimebox(createdTimebox);
    } catch (error) {
      this.setState({ hasError: true });
    }
  };

  render() {
    const { hasError, timeboxes } = this.state;

    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />
        {hasError ? (
          <ErrorMessage
            hasError={hasError}
            message={'An error occurred in the timebox adding feature.'}
          />
        ) : (
          timeboxes.map((timebox) => (
            <Timebox
              key={timebox.id}
              title={timebox.title}
              totalTimeInMinutes={timebox.totalTimeInMinutes}
              onDelete={() => this.removeTimebox(timebox.id)}
              onEdit={(editedTimebox) =>
                this.updateTimebox(timebox.id, editedTimebox)
              }
            />
          ))
        )}
      </>
    );
  }
}
