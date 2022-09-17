import { useState, useCallback } from 'react';
import { useInterval } from './useInterval';

export const useTimeOnPage = () => {
  const [, setTimeOnPage] = useState(0);

  const onIncrementTimeonPage = useCallback(
    () =>
      setTimeOnPage((prevTimeOnPage) => {
        const incrementedTimeonPage = prevTimeOnPage + 1;

        console.log(`Time spent on page: ${incrementedTimeonPage}`);

        return incrementedTimeonPage;
      }),
    []
  );

  const intervalTools = useInterval(onIncrementTimeonPage, 1000);

  return intervalTools;
};
