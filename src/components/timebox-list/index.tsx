import React from 'react';
import { TimeboxCreator, LoadingSpinner, ErrorMessage, Timebox } from '..';
import { FakeTimeboxesApi } from '../../api';
import { TimeboxType, TimeboxDataHandlerType, IdType } from '../../common';

type TimeboxListStateType = {
  isLoading: boolean;
  hasError: boolean;
  timeboxes: TimeboxType[];
};

export class TimeboxList extends React.Component<{}, TimeboxListStateType> {
  state: TimeboxListStateType = {
    isLoading: true,
    hasError: false,
    timeboxes: [],
  };

  componentDidMount() {
    FakeTimeboxesApi.getTimeboxes()
      .then((timeboxes) => {
        this.setState((prevState) => ({ ...prevState, timeboxes }));
      })
      .then(() => {
        this.setState((prevState) => ({ ...prevState, isLoading: false }));
      });
  }

  addTimebox: TimeboxDataHandlerType = (addedTimebox) => {
    FakeTimeboxesApi.addTimebox(addedTimebox).then((newTimebox) => {
      this.setState((prevState) => ({
        ...prevState,
        timeboxes: [...prevState.timeboxes, newTimebox],
      }));
    });
  };

  updateTimebox = (updatedTimebox: TimeboxType) => {
    FakeTimeboxesApi.editTimebox(updatedTimebox)
      .then((newTimeBox) => {
        this.setState((prevState) => {
          const timeboxes = prevState.timeboxes.map((timebox) =>
            timebox.id === newTimeBox.id ? newTimeBox : timebox
          );
          return { ...prevState, timeboxes };
        });
      })
      .catch(() => {
        this.setState((prevState) => ({ ...prevState, hasError: true }));
      });
  };

  removeTimebox = (removedTimeboxId: IdType) => {
    FakeTimeboxesApi.removeTimebox(removedTimeboxId)
      .then((removedTimebox) => {
        this.setState((prevState) => ({
          ...prevState,
          timeboxes: prevState.timeboxes.filter(
            (timebox) => timebox.id !== removedTimebox.id
          ),
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({ ...prevState, hasError: true }));
      });
  };

  render() {
    const { isLoading, hasError, timeboxes } = this.state;

    return (
      <>
        <TimeboxCreator onCreate={this.addTimebox} />
        {isLoading && !hasError ? <LoadingSpinner fullWidth /> : null}
        {!isLoading && hasError ? (
          <ErrorMessage
            hasError={hasError}
            message={'An error occurred in the timebox adding feature.'}
          />
        ) : null}
        {!isLoading && !hasError
          ? timeboxes.map((timebox) => (
              <Timebox
                key={timebox.id}
                timebox={timebox}
                onDelete={() => this.removeTimebox(timebox.id)}
                onEdit={this.updateTimebox}
              />
            ))
          : null}
      </>
    );
  }
}
