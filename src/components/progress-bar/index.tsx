import React from 'react';
import { assertObjectIsOfCssVariablesPropertiesType } from '../../utils';
import './styles.scss';

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
  const classes = [
    'ProgressBar',
    trackRemaining ? 'tracking' : '',
    percent >= 100 ? 'completed' : '',
    className,
  ].join(' ');

  const cssVariable = { '--progress': `${percent}%` };
  assertObjectIsOfCssVariablesPropertiesType(cssVariable);

  return <div className={classes} style={cssVariable}></div>;
};
