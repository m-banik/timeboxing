import { useEffect } from 'react';

export const useTitle = (title: string, dependencies: unknown[]) => {
  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line
  }, dependencies);
};
