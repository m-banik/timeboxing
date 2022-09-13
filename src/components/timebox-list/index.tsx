import React from 'react';
import { TimeboxCreator } from '../timebox-creator';
import { LoadingSpinner } from '../loading-spinner';
import { ErrorMessage } from '../error-message';
import { TimeboxesApi } from '../../api/TimeboxesApi';
import {
  TimeboxType,
  TimeboxDataHandlerType,
  IdType,
  InputChangeEventHandlerType,
} from '../../common/types';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import './styles.scss';

const Timebox = React.lazy(() =>
  import('../timebox').then(({ Timebox }) => ({ default: Timebox }))
);

const timeboxesApi = new TimeboxesApi({
  requestTool: 'axios',
  baseUrl: 'http://localhost:4001/timeboxes',
});

export const TimeboxList = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [timeboxes, setTimeboxes] = React.useState<TimeboxType[]>([]);

  const context = React.useContext(AuthenticationContext);

  const getAllTimeboxes = React.useCallback(() => {
    timeboxesApi
      .getTimeboxes(context.accessToken)
      .then((timeboxes) => {
        setTimeboxes(timeboxes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [context.accessToken]);

  const getTimeboxesByPhrase = React.useCallback(
    (phrase: string) => {
      timeboxesApi
        .getTimeboxesByFullTextSearch(phrase, context.accessToken)
        .then((timeboxes) => {
          setTimeboxes(timeboxes);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setHasError(true);
        });
    },
    [context.accessToken]
  );

  const addTimebox = React.useCallback<TimeboxDataHandlerType>(
    (addedTimebox) => {
      timeboxesApi
        .addTimebox(addedTimebox, context.accessToken)
        .then((newTimebox) => {
          setTimeboxes((timeboxes) => [...timeboxes, newTimebox]);
        });
    },
    [context.accessToken]
  );

  const updateTimebox = React.useCallback(
    (updatedTimebox: TimeboxType) => {
      timeboxesApi
        .partiallyUpdateTimebox(updatedTimebox, context.accessToken)
        .then((newTimeBox) => {
          setTimeboxes((prevTimeboxes) =>
            prevTimeboxes.map((timebox) =>
              timebox.id === newTimeBox.id ? newTimeBox : timebox
            )
          );
        })
        .catch(() => setHasError(true));
    },
    [context.accessToken]
  );

  const removeTimebox = React.useCallback(
    (removedTimeboxId: IdType) => {
      timeboxesApi
        .removeTimebox(removedTimeboxId, context.accessToken)
        .then(() => {
          setTimeboxes((prevTimeboxes) =>
            prevTimeboxes.filter((timebox) => timebox.id !== removedTimeboxId)
          );
        })
        .catch(() => setHasError(true));
    },
    [context.accessToken]
  );

  const handleSearchByPhrase = React.useCallback<InputChangeEventHandlerType>(
    ({ target }) => {
      const { value } = target;

      value.length < 1 ? getAllTimeboxes() : getTimeboxesByPhrase(value);
    },
    [getAllTimeboxes, getTimeboxesByPhrase]
  );

  React.useEffect(
    () => getAllTimeboxes(),
    //eslint-disable-next-line
    []
  );

  return (
    <>
      <TimeboxCreator onCreate={addTimebox} />
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
              onChange={handleSearchByPhrase}
            />
          </label>
          {timeboxes.map((timebox) => (
            <React.Suspense
              key={timebox.id}
              fallback={<LoadingSpinner fullWidth />}
            >
              <Timebox
                timebox={timebox}
                onDelete={() => removeTimebox(timebox.id)}
                onEdit={updateTimebox}
              />
            </React.Suspense>
          ))}
        </div>
      ) : null}
    </>
  );
};
