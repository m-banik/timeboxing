import React from 'react';
import { assertObjectIsOfCssVariablesPropertiesType } from '../../utils';
import './styles.css';

type ProgressBarPropsType = {
  percent: number;
  className?: string;
  trackRemaining?: boolean;
};

export const ProgressBar: React.FC<ProgressBarPropsType> = ({
  percent,
  className = '',
  trackRemaining = false,
}) => {
  const cssVariable = { '--progress': `${percent}%` };
  assertObjectIsOfCssVariablesPropertiesType(cssVariable);

  return (
    <div
      className={`ProgressBar ${
        trackRemaining ? 'remaining' : ''
      } ${className}`}
      style={cssVariable}
    ></div>
  );
};
