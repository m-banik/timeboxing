import React from 'react';
import { TimeboxCreator, LoadingSpinner, ErrorMessage, Timebox } from '..';
// ToDo: Changed due to the different data source
// import { createTimeboxesApi } from '../../api';
// import { createFakeTimeboxesApi } from '../../api';
import { createAxiosTimeboxesApi } from '../../api';
import {
  TimeboxType,
  TimeboxDataHandlerType,
  IdType,
  InputChangeEventHandlerType,
} from '../../common';
import './styles.scss';

// const timeboxesApi = createTimeboxesApi();
// const timeboxesApi = createFakeTimeboxesApi({ delayInMiliseconds: 4000 });
const timeboxesApi = createAxiosTimeboxesApi();

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
    this.getAllTimeboxes();
  }

  getAllTimeboxes = () => {
    timeboxesApi
      .getTimeboxes()
      .then((timeboxes) => {
        this.setState((prevState) => ({
          ...prevState,
          timeboxes,
          isLoading: false,
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          hasError: true,
        }));
      });
  };

  getTimeboxesByPhrase = (phrase: string) => {
    timeboxesApi
      .getTimeboxesByFullTextSearch(phrase)
      .then((timeboxes) => {
        this.setState((prevState) => ({
          ...prevState,
          timeboxes,
          isLoading: false,
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          hasError: true,
        }));
      });
  };

  addTimebox: TimeboxDataHandlerType = (addedTimebox) => {
    timeboxesApi.addTimebox(addedTimebox).then((newTimebox) => {
      this.setState((prevState) => ({
        ...prevState,
        timeboxes: [...prevState.timeboxes, newTimebox],
      }));
    });
  };

  updateTimebox = (updatedTimebox: TimeboxType) => {
    timeboxesApi
      .partiallyUpdateTimebox(updatedTimebox)
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
    timeboxesApi
      .removeTimebox(removedTimeboxId)
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          timeboxes: prevState.timeboxes.filter(
            (timebox) => timebox.id !== removedTimeboxId
          ),
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({ ...prevState, hasError: true }));
      });
  };

  handleSearchByPhrase: InputChangeEventHandlerType = ({ target }) => {
    const { value } = target;

    if (value.length < 1) {
      this.getAllTimeboxes();
    } else {
      this.getTimeboxesByPhrase(value);
    }
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
        {!isLoading && !hasError ? (
          <div className="timeboxList">
            <label className="timeboxList__searchEngine">
              Szukaj po frazie:
              <input
                className="timeboxList__searchEngine__input"
                type="text"
                onChange={this.handleSearchByPhrase}
              />
            </label>
            {timeboxes.map((timebox) => (
              <Timebox
                key={timebox.id}
                timebox={timebox}
                onDelete={() => this.removeTimebox(timebox.id)}
                onEdit={this.updateTimebox}
              />
            ))}
          </div>
        ) : null}
      </>
    );
  }
}
