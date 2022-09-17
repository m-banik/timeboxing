import React from 'react';
import { Checkbox } from './Checkbox';
import { RadioButton } from './RadioButton';
import { withImportance } from './wrappers/withImportance';
import { withLogs } from './wrappers/withLogs';
import { withOnOffState } from './wrappers/withOnOffState';
import './styles.scss';

export interface CommonInterface {
  isImportant?: boolean;
  isOn?: boolean;
  onToggle?: React.ChangeEventHandler<HTMLInputElement>;
  children: NonNullable<React.ReactNode>;
}

const ExtendedCheckbox = withOnOffState(withImportance(withLogs(Checkbox)));

const ExtendedRadioButton = withOnOffState(RadioButton);

export const HocExample: React.FC = () => {
  return (
    <div className="hocExample">
      <ExtendedCheckbox>abc</ExtendedCheckbox>
      <ExtendedRadioButton>abc</ExtendedRadioButton>
      <Checkbox>Checkbox</Checkbox>
      <RadioButton>RadioButton</RadioButton>
    </div>
  );
};
