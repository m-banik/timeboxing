import React from 'react';
import { CommonInterface } from '..';

export const withLogs = (ComponentWithoutLogs: React.FC<CommonInterface>) => {
  const ComponentWithLogs: React.FC<CommonInterface> = (props) => {
    const mountFlagRef = React.useRef(false);

    React.useEffect(() => {
      if (mountFlagRef.current) {
        console.log('Component did update');
      }
    }, [props]);

    React.useEffect(() => {
      if (!mountFlagRef.current) {
        console.log('Component did mount');

        mountFlagRef.current = true;
      }

      return () => console.log('Component will unmount');
    }, []);

    return <ComponentWithoutLogs {...props} />;
  };

  return ComponentWithLogs;
};
