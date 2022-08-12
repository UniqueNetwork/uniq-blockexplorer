import React, { FC } from 'react';

interface SelectOption {
  key: string;
  value: string;
  title: string;
  icon: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChangeValue(value: string): void;
}

const Select: FC<SelectProps> = ({ onChangeValue, options, value }) => {
  return <></>;
};

export default Select;
