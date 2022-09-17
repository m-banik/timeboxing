import React from 'react';
import { CommonInterface } from '.';
import { Input } from './Input';

export const Checkbox: React.FC<CommonInterface> = ({
  isImportant,
  isOn,
  onToggle,
  children,
}) => {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        {isImportant ? (
          <strong className="checkbox__label__children">{children}</strong>
        ) : (
          <span className="checkbox__label__children">{children}</span>
        )}
        <Input
          type={'checkbox'}
          className="checkbox__label__input"
          isOn={isOn}
          onToggle={onToggle}
        />
      </label>
    </div>
  );
};
