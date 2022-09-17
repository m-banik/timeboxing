import { useState, useRef, useCallback, useEffect } from 'react';

export const useInterval = (callback: VoidFunction, delay: number) => {
  const intervalIdRef = useRef<number>();

  const memoizedCallback = useCallback(callback, [callback]);

  const [isIntervalSet, setIsIntervalSet] = useState(false);

  const onSetInterval = useCallback(() => setIsIntervalSet(true), []);

  const onClearInterval = useCallback(() => setIsIntervalSet(false), []);

  useEffect(() => {
    if (isIntervalSet) {
      intervalIdRef.current = window.setInterval(memoizedCallback, delay);
    } else {
      window.clearInterval(intervalIdRef.current);
    }

    return () => window.clearInterval(intervalIdRef.current);
  }, [isIntervalSet, delay, memoizedCallback]);

  return {
    isIntervalSet,
    onSetInterval,
    onClearInterval,
  };
};
