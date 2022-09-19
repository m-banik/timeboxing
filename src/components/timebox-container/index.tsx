import React from 'react';
import { TimeboxCreator } from '../timebox-creator';
import { LoadingSpinner } from '../loading-spinner';
import { ErrorMessage } from '../error-message';
import { TimeboxList } from '../timebox-list';
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

const TimeboxEditor = React.lazy(() =>
  import('../timebox-editor').then(({ TimeboxEditor }) => ({
    default: TimeboxEditor,
  }))
);

const timeboxesApi = new TimeboxesApi({
  requestTool: 'axios',
  baseUrl: 'http://localhost:4001/timeboxes',
});

export const TimeboxContainer = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [editedTimeboxId, setEditedTimeboxId] = React.useState<IdType | null>(
    null
  );
  const [timeboxes, setTimeboxes] = React.useState<TimeboxType[]>([]);

  const { accessToken } = React.useContext(AuthenticationContext);

  const onCancelTimeboxEdition = React.useCallback(
    () => setEditedTimeboxId(null),
    []
  );

  const onChooseEditedTimebox = React.useCallback(
    (timeboxId: IdType) => setEditedTimeboxId(timeboxId),
    []
  );

  const getAllTimeboxes = React.useCallback(() => {
    timeboxesApi
      .getTimeboxes(accessToken)
      .then((timeboxes) => {
        setTimeboxes(timeboxes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [accessToken]);

  const getTimeboxesByPhrase = React.useCallback(
    (phrase: string) => {
      timeboxesApi
        .getTimeboxesByFullTextSearch(phrase, accessToken)
        .then((timeboxes) => {
          setTimeboxes(timeboxes);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setHasError(true);
        });
    },
    [accessToken]
  );

  const addTimebox = React.useCallback<TimeboxDataHandlerType>(
    (addedTimebox) => {
      timeboxesApi.addTimebox(addedTimebox, accessToken).then((newTimebox) => {
        setTimeboxes((timeboxes) => [...timeboxes, newTimebox]);
      });
    },
    [accessToken]
  );

  const updateTimebox = React.useCallback(
    (updatedTimebox: TimeboxType) => {
      timeboxesApi
        .partiallyUpdateTimebox(updatedTimebox, accessToken)
        .then((newTimeBox) => {
          setTimeboxes((prevTimeboxes) =>
            prevTimeboxes.map((timebox) =>
              timebox.id === newTimeBox.id ? newTimeBox : timebox
            )
          );
        })
        .catch(() => setHasError(true));
    },
    [accessToken]
  );

  const removeTimebox = React.useCallback(
    (removedTimeboxId: IdType) => {
      timeboxesApi
        .removeTimebox(removedTimeboxId, accessToken)
        .then(() => {
          setTimeboxes((prevTimeboxes) =>
            prevTimeboxes.filter((timebox) => timebox.id !== removedTimeboxId)
          );
        })
        .catch(() => setHasError(true));
    },
    [accessToken]
  );

  const handleSearchByPhrase = React.useCallback<InputChangeEventHandlerType>(
    ({ target }) => {
      const { value } = target;

      value.length < 1 ? getAllTimeboxes() : getTimeboxesByPhrase(value);
    },
    [getAllTimeboxes, getTimeboxesByPhrase]
  );

  const renderTimeboxes = React.useCallback(() => {
    return timeboxes.map((timebox) => (
      <React.Suspense key={timebox.id} fallback={<LoadingSpinner fullWidth />}>
        {editedTimeboxId === timebox.id ? (
          <TimeboxEditor
            timebox={timebox}
            onCancel={onCancelTimeboxEdition}
            onEdit={updateTimebox}
          />
        ) : (
          <Timebox
            timebox={timebox}
            onEdit={onChooseEditedTimebox}
            onDelete={removeTimebox}
          />
        )}
      </React.Suspense>
    ));
  }, [
    timeboxes,
    editedTimeboxId,
    onCancelTimeboxEdition,
    updateTimebox,
    onChooseEditedTimebox,
    removeTimebox,
  ]);

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
        <div className="timeboxContainer">
          <label className="timeboxContainer__searchEngine">
            Szukaj po frazie:
            <input
              className="timeboxContainer__searchEngine__input"
              type="text"
              onChange={handleSearchByPhrase}
            />
          </label>
          <TimeboxList renderTimeboxes={renderTimeboxes} />
        </div>
      ) : null}
    </>
  );
};
