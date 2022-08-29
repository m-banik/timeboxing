import React from 'react';
import CN from 'classnames';
import './styles.css';

type LoadingSpinnerPropsType = {
  fullWidth?: boolean;
};

export const LoadingSpinner: React.FC<LoadingSpinnerPropsType> = ({
  fullWidth,
}) => {
  const classNames = CN('LoadingSpinner', {
    'LoadingSpinner--centered': fullWidth,
  });
  return (
    <div className={classNames}>
      <div className={'LoadingSpinner_body'}>
        <div className={'LoadingSpinner_body_filler'}></div>
      </div>
    </div>
  );
};
