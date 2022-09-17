import React from 'react';
import { CommonInterface } from '.';
import { Input } from './Input';

export const RadioButton: React.FC<CommonInterface> = ({
  isImportant,
  isOn,
  onToggle,
  children,
}) => {
  return (
    <div className="radioButton">
      {isImportant ? (
        <strong className="radioButton__children">{children}</strong>
      ) : (
        <span className="radioButton__children">{children}</span>
      )}
      <label className="radioButton__label">
        On:
        <Input
          className={'radioButton__label__input'}
          type={'radio'}
          isOn={isOn}
          onToggle={onToggle}
        />
      </label>
      <label className="radioButton__label">
        Off:
        <Input
          className={'radioButton__label__input'}
          type={'radio'}
          isOn={!isOn}
          onToggle={onToggle}
        />
      </label>
    </div>
  );
};
