import React, { FC, useMemo } from 'react';
import { classNames } from '../utils/classNames';

interface ButtonProps {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'outlined';
}

const Button: FC<ButtonProps> = (props) => {
  const { disabled, icon, iconPosition = 'left', onClick, text, type = 'primary' } = props;

  const _classNames = useMemo(() => classNames({
    disabled: !!disabled,
    'icon-right': iconPosition === 'right',
    primary: type === 'primary',
    secondary: type === 'secondary'
  }), [type, disabled, iconPosition]);

  return (
    <button
      className={`button ${_classNames}`}
      disabled={disabled}
      onClick={onClick}
      type='button'
    >
      {icon && <span className={'button__icon'}>{icon}</span>}
      {text}
    </button>
  );
};

export default React.memo(Button);
