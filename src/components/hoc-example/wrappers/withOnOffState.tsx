import React from 'react';
import { CommonInterface } from '..';

export const withOnOffState = (
  StatelessComponent: React.FC<CommonInterface>
) => {
  const ComponentWithState: React.FC<CommonInterface> = (props) => {
    const [isOn, setIsOn] = React.useState(false);

    const handleToggle = React.useCallback(
      () => setIsOn((prevState) => !prevState),
      []
    );

    const newProps: CommonInterface = {
      ...props,
      isOn,
      onToggle: handleToggle,
    };

    return <StatelessComponent {...newProps} />;
  };

  return ComponentWithState;
};
