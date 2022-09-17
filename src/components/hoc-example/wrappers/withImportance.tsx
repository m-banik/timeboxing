import React from 'react';
import { CommonInterface } from '..';

export const withImportance = (
  UnImportantComponent: React.FC<CommonInterface>
) => {
  const ImportantComponent: React.FC<CommonInterface> = (props) => {
    const newProps: CommonInterface = { ...props, isImportant: true };

    return <UnImportantComponent {...newProps} />;
  };

  return ImportantComponent;
};
