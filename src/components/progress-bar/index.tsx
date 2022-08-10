import React from 'react';
import CN from 'classnames';
import { assertObjectIsOfCssVariablesPropertiesType } from '../../utilities';
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
  const classes = CN('ProgressBar', {
    tracking: trackRemaining,
    completed: percent >= 100,
    [className]: !!className,
  });

  let percentCSSValue = percent > 100 ? 100 : percent;
  if (percentCSSValue < 0) {
    percentCSSValue = 0;
  }

  const cssVariable = { '--progress': `${percentCSSValue}%` };
  assertObjectIsOfCssVariablesPropertiesType(cssVariable);

  return <div className={classes} style={cssVariable}></div>;
};
