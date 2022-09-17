import React from 'react';
import { CommonInterface } from '.';

interface InputInterface {
  className?: string;
  type: 'checkbox' | 'radio';
  isOn: CommonInterface['isOn'];
  onToggle: CommonInterface['onToggle'];
}

export const Input: React.FC<InputInterface> = ({
  className,
  type,
  isOn,
  onToggle,
}) => {
  const input = <input type={type} className={className} />;

  return React.cloneElement(
    input,
    typeof isOn === 'boolean' && onToggle
      ? { checked: isOn, onChange: onToggle }
      : { defaultChecked: false }
  );
};
