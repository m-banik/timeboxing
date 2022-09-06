import React from 'react';
import { TimeboxCreator, LoadingSpinner, ErrorMessage, Timebox } from '..';
// ToDo: Changed due to the different data source
// import { createFakeTimeboxesApi } from '../../api';
// import { createFetchTimeboxesApi } from '../../api';
// import { createAxiosTimeboxesApi } from '../../api';
import { createTimeboxesApi } from '../../api';
import {
  TimeboxType,
  RequestToolKindType,
  TimeboxDataHandlerType,
  IdType,
  InputChangeEventHandlerType,
} from '../../common';
import './styles.scss';

// const timeboxesApi = createFakeTimeboxesApi({ delayInMiliseconds: 1000 });

// const timeboxesApi = createFetchTimeboxesApi({
//   baseUrl: 'http://localhost:4001/timeboxes',
// });

// const timeboxesApi = createAxiosTimeboxesApi({
//   baseUrl: 'http://localhost:4001/timeboxes',
// });

const timeboxesApi = createTimeboxesApi({
  baseUrl: 'http://localhost:4001/timeboxes',
});

type TimeboxListPropsType = {
  accessToken?: string;
};

type TimeboxListStateType = {
  isLoading: boolean;
  hasError: boolean;
  timeboxes: TimeboxType[];
};

export class TimeboxList extends React.Component<
  TimeboxListPropsType,
  TimeboxListStateType
> {
  state: TimeboxListStateType = {
    isLoading: true,
    hasError: false,
    timeboxes: [],
  };

  requestToolKind: RequestToolKindType = 'axios';

  componentDidMount() {
    this.getAllTimeboxes();
  }

  getAllTimeboxes = () => {
    timeboxesApi
      .getTimeboxes(this.requestToolKind, this.props.accessToken)
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
      .getTimeboxesByFullTextSearch(
        this.requestToolKind,
        phrase,
        this.props.accessToken
      )
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
    timeboxesApi
      .addTimebox(this.requestToolKind, addedTimebox, this.props.accessToken)
      .then((newTimebox) => {
        this.setState((prevState) => ({
          ...prevState,
          timeboxes: [...prevState.timeboxes, newTimebox],
        }));
      });
  };

  updateTimebox = (updatedTimebox: TimeboxType) => {
    timeboxesApi
      .partiallyUpdateTimebox(
        this.requestToolKind,
        updatedTimebox,
        this.props.accessToken
      )
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
      .removeTimebox(
        this.requestToolKind,
        removedTimeboxId,
        this.props.accessToken
      )
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
