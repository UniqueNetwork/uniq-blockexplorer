import { isValidElement, Key, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import { ComponentProps, DropdownOptionProps } from '../types';
import { SVGIcon, SVGIconProps } from '../SVGIcon';

export interface DropdownProps extends Omit<ComponentProps, 'onChange'> {
  open?: boolean;
  options?: DropdownOptionProps[];
  optionKey?: string;
  optionValue?: string;
  placement?: 'left' | 'right';
  children: JSX.Element;
  iconLeft?: SVGIconProps | ReactNode;
  iconRight?: SVGIconProps | ReactNode;
  isTouch?: boolean;
  verticalOffset?: number | string;
  onChange?(option: DropdownOptionProps): void;
  onOpenChange?(open: boolean): void;
  optionRender?(option: DropdownOptionProps, isSelected: boolean): ReactNode;
  dropdownRender?(): ReactNode;
}

export const Dropdown = ({
  id,
  value,
  className,
  disabled,
  options,
  optionKey = 'id',
  optionValue = 'title',
  onChange,
  children,
  optionRender,
  dropdownRender,
  placement = 'left',
  iconLeft,
  iconRight,
  open,
  isTouch,
  verticalOffset,
  onOpenChange,
}: DropdownProps) => {
  const selected = options?.find(
    (option) => option[optionKey as keyof DropdownOptionProps] === value,
  );

  const [dropped, setDropped] = useState<boolean>(!!open);

  useEffect(() => {
    setDropped(!!open);
  }, [open, setDropped]);

  const handleClickOutside = () => {
    document.removeEventListener('mousedown', handleClickOutside);
    setDropped(false);
    onOpenChange?.(false);
  };

  const handleMouseLeave = () => {
    document.addEventListener('mousedown', handleClickOutside);
  };

  const handleMouseEnter = () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleOptionSelect = (option: DropdownOptionProps) => {
    setDropped(false);
    onOpenChange?.(false);
    onChange?.(option);
  };

  const handleMouseClick = () => {
    if (disabled) return;

    setDropped(!dropped);
    onOpenChange?.(!dropped);
  };

  return (
    <Wrapper
      className={classNames('skan-dropdown', className, {
        touch: isTouch,
      })}
      id={id}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className={classNames('dropdown-wrapper', {
          dropped,
          disabled,
        })}
        data-testid="dropdown-wrapper"
        onClick={handleMouseClick}
      >
        {iconLeft &&
          (isValidElement(iconLeft) ? (
            iconRight
          ) : (
            <SVGIcon {...(iconLeft as SVGIconProps)} />
          ))}
        {children}
        {iconRight &&
          (isValidElement(iconRight) ? (
            iconRight
          ) : (
            <SVGIcon {...(iconRight as SVGIconProps)} />
          ))}
      </div>
      {dropped && (
        <div
          className={classNames('dropdown-options', {
            right: placement === 'right',
            touch: isTouch,
          })}
          role="listbox"
          {...(verticalOffset && {
            style: {
              top: verticalOffset,
              height: `calc(100vh - (${verticalOffset} + 36px))`,
            },
          })}
        >
          {dropdownRender?.()}
          {options?.map((option) => {
            const isSelected =
              option[optionKey as keyof DropdownOptionProps] ===
              selected?.[optionKey as keyof DropdownOptionProps];
            return (
              <div
                className={classNames('dropdown-option', {
                  selected: isSelected,
                  disabled,
                })}
                key={(option as DropdownOptionProps)[optionKey] as Key}
                role="option"
                onClick={() => handleOptionSelect(option)}
              >
                {optionRender?.(option, isSelected) ||
                  (option[optionValue as keyof DropdownOptionProps] as string)}
              </div>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: var(--prop-font-family);
  font-size: var(--prop-font-size);
  font-weight: var(--prop-font-weight);
  position: relative;

  &.touch {
    width: 100%;
    .dropdown-wrapper {
      width: fit-content;
    }
    .dropdown-options {
      box-shadow: none;
    }
  }

  .dropdown-wrapper {
    position: relative;
    width: 100%;
    float: right;

    .icon-triangle {
      position: absolute;
      right: var(--prop-gap);
      top: 50%;
      margin-top: -4px;
    }
    &.dropped .icon-triangle {
      transform: rotate(180deg);
    }
  }

  .dropdown-options {
    background-color: var(--color-additional-light);
    border-radius: var(--prop-border-radius);
    padding: 8px;
    position: absolute;
    min-width: calc(100% - 16px);
    left: 0;
    top: calc(100% + 4px);
    z-index: 9;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);

    &.right {
      left: unset;
      right: 0;
    }

    .dropdown-option {
      display: flex;
      align-items: center;
      cursor: pointer;
      min-height: 32px;
      line-height: 32px;
      padding: 0 8px;
      position: relative;
      min-width: calc(100% - 16px);
      white-space: nowrap;

      &:not(:last-child) {
        margin-bottom: 3px;
      }

      &:hover,
      &.selected {
        background-color: var(--color-primary-100);
        color: var(--color-primary-500);
s      }
    }
  }
`;
