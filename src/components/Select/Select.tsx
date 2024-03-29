import { Key, ReactNode, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components/macro';

import { SVGIcon } from '@app/components';

import { ComponentProps, DimentionType, SelectOptionProps } from '../types';

export interface SelectProps extends ComponentProps {
  options: SelectOptionProps[];
  optionKey?: string;
  optionValue?: string;
  additionalText?: string | number;
  error?: boolean;
  label?: ReactNode;
  statusText?: string;
  size?: DimentionType;
  multi?: boolean;
  values?: string[] | undefined;
  onChange(option: SelectOptionProps | SelectOptionProps[]): void;
}

export const Select = ({
  id,
  value,
  autoFocus,
  label,
  additionalText,
  statusText,
  className,
  defaultValue,
  error,
  options,
  placeholder,
  disabled,
  tabIndex = -1,
  size = 'middle',
  optionKey = 'id',
  optionValue = 'title',
  onChange,
  onFocus,
  onBlur,
  multi = false,
  values,
  testid,
}: SelectProps) => {
  useEffect(() => {
    const defaultOption =
      defaultValue &&
      options.find((option) => (option as SelectOptionProps)[optionKey] === defaultValue);
    defaultOption && onChange(defaultOption);
  }, []);

  const selected = options.find(
    (option) => option[optionKey as keyof SelectOptionProps] === value,
  );

  const selectedMulti: SelectOptionProps[] = useMemo(
    () =>
      multi && values
        ? (values
            .map((value) => {
              return options.find(
                (item) => item[optionKey as keyof SelectOptionProps] === value,
              );
            })
            .filter((item) => !!item) as SelectOptionProps[])
        : [],
    [multi, optionKey, options, values],
  );

  const icon = selected?.iconLeft || selected?.iconRight;

  const [dropped, setDropped] = useState<boolean>(!!autoFocus);

  const handleMouseDown = () => {
    !disabled && setDropped(!dropped);
  };

  const handleClickOutside = () => {
    document.removeEventListener('mousedown', handleClickOutside);
    setDropped(false);
  };

  const handleMouseLeave = () => {
    document.addEventListener('mousedown', handleClickOutside);
  };

  const handleMouseEnter = () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleOptionSelect = (option: SelectOptionProps) => {
    setDropped(false);

    if (multi) onChange?.([...selectedMulti, option]);
    else onChange?.(option);
  };

  const handleOptionUnselect = (option: SelectOptionProps) => {
    !disabled &&
      multi &&
      onChange?.(
        selectedMulti.filter(
          (item) =>
            option[optionKey as keyof SelectOptionProps] !==
            item[optionKey as keyof SelectOptionProps],
        ),
      );
  };

  const isSelected = (option: SelectOptionProps) => {
    if (multi)
      return selectedMulti.some(
        (item) =>
          option[optionKey as keyof SelectOptionProps] ===
          item[optionKey as keyof SelectOptionProps],
      );

    return (
      option[optionKey as keyof SelectOptionProps] ===
      selected?.[optionKey as keyof SelectOptionProps]
    );
  };

  return (
    <Wrapper
      className={classNames(`size-${size}`, className, {
        error,
      })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      {additionalText && <div className="additional-text">{additionalText}</div>}
      <div
        className={classNames('select-wrapper', {
          dropped,
          disabled,
        })}
        tabIndex={tabIndex}
        id={id}
        data-testid={testid}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <SVGIcon className="icon icon-triangle" name="triangle" height={8} width={8} />
        <div
          className={classNames('select-value', {
            'with-icon': icon,
            'to-left': selected?.iconLeft,
            'to-right': selected?.iconRight,
            multi,
          })}
          onMouseDown={handleMouseDown}
        >
          {multi &&
            selectedMulti.length > 0 &&
            selectedMulti.map((selectedOption, index) => (
              <div className={'select-tag'} key={index}>
                {selectedOption?.[optionValue as keyof SelectOptionProps]}
                <div onClick={() => handleOptionUnselect(selectedOption)}>
                  <SVGIcon color="white" name="close" height={10} width={10} />
                </div>
              </div>
            ))}
          {!multi && (
            <>
              {selected?.[optionValue as keyof SelectOptionProps]}
              {icon && <SVGIcon {...icon} />}
            </>
          )}
          {!(multi && selectedMulti.length) && !(!multi && selected) && placeholder && (
            <span className="select-placeholder">{placeholder}</span>
          )}
        </div>
        {dropped && options && (
          <div className="select-dropdown">
            {options.map((option) => {
              const icon = option.iconLeft || option.iconRight;
              const selected = isSelected(option);
              return (
                <div
                  className={classNames('dropdown-option', {
                    selected,
                    'with-icon': icon,
                    'to-left': option.iconLeft,
                    'to-right': option.iconRight,
                    disabled,
                  })}
                  key={(option as SelectOptionProps)[optionKey] as Key}
                  onClick={() =>
                    selected && multi
                      ? handleOptionUnselect(option)
                      : handleOptionSelect(option)
                  }
                >
                  {option[optionValue as keyof SelectOptionProps]}
                  {icon && <SVGIcon {...icon} />}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {statusText && <div className="status-text">{statusText}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: var(--prop-font-family);
  font-size: var(--prop-font-size);
  font-weight: var(--prop-font-weight);
  position: relative;
  &:focus &:active {
    outline: none;
  }

  label {
    color: var(--color-secondary-500);
    display: block;
    font-size: 16px;
    font-weight: 600;
    height: 24px;
    line-height: 24px;
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .additional-text {
    color: var(--color-grey-500);
    font-size: 14px;
    height: 22px;
    line-height: 22px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .status-text {
    color: var(--color-grey-500);
    font-size: 14px;
    line-height: 22px;
    margin-top: 8px;
    min-height: 22px;
    width: 100%;
  }

  .select-wrapper {
    position: relative;
    width: 100%;

    &.dropped {
      .select-value {
        border: 1px solid var(--color-grey-400);
      }
    }
    &:focus {
      outline: none;
    }

    .select-value {
      display: flex;
      align-items: center;
      border: 1px solid var(--color-grey-300);
      border-radius: var(--prop-border-radius);
      cursor: pointer;
      outline: none;
      height: 16px;
      padding: 11px 16px;
      position: relative;
      width: calc(100% - 34px);
      margin-right: 16px;

      &.with-icon {
        &.to-right {
          flex-direction: row;
          .icon-triangle,
          img,
          svg {
            margin-left: 4px;
          }
        }
        &.to-left {
          flex-direction: row-reverse;
          justify-content: flex-end;
          .icon-triangle,
          img,
          svg {
            margin-right: 4px;
          }
        }
      }

      .select-placeholder {
        color: var(--color-grey-400);
      }

      &:focus,
      &:hover {
        border: 1px solid var(--color-grey-500);
      }

      &.multi {
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        row-gap: 8px;
        padding: 8px 16px;

        height: unset;
        min-height: 24px;
        flex-wrap: wrap;
      }
      .select-tag {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 8px;
        height: 24px;
        line-height: 22px;
        background: var(--color-primary-300);
        border-radius: var(--prop-border-radius);
        color: var(--color-additional-light);
        column-gap: 8px;
      }
    }

    .select-dropdown {
      background-color: var(--color-additional-light);
      border: 1px solid var(--color-grey-300);
      border-radius: var(--prop-border-radius);
      padding: 8px;
      position: absolute;
      left: 0;
      top: calc(100% + 4px);
      width: calc(100% - 18px);
      z-index: 3;

      .dropdown-option {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        position: relative;
        width: calc(100% - 16px);

        &.with-icon {
          &.to-right {
            flex-direction: row;
            .icon-triangle,
            img,
            svg {
              margin-left: 4px;
            }
          }
          &.to-left {
            flex-direction: row-reverse;
            justify-content: flex-end;
            .icon-triangle,
            img,
            svg {
              margin-right: 4px;
            }
          }
        }

        &:not(:last-child) {
          margin-bottom: 3px;
        }

        &:hover,
        &.selected {
          background-color: var(--color-primary-100);
          color: var(--color-primary-500);

          .icon-triangle {
            fill: var(--color-primary-500);
          }
        }
      }
    }

    .icon-triangle {
      position: absolute;
      top: 0;
      right: 0;
      margin: 17px;
      cursor: pointer;
      fill: var(--color-blue-grey-400);
    }

    &.dropped .icon-triangle {
      transform: rotate(180deg);
    }

    &.disabled {
      background-color: var(--color-grey-100);
      color: var(--color-blue-grey-400);
      .select-value {
        cursor: default;
        .select-placeholder {
          color: var(--color-grey-400);
        }
      }
      .icon-triangle {
        cursor: initial;
        fill: var(--color-grey-400);
        z-index: 0;
      }
      .select-tag {
        background-color: var(--color-grey-300);
      }
    }
  }

  &.error {
    .select-wrapper {
      .select-value {
        border: 1px solid var(--color-coral-500);
      }
    }
    .status-text {
      color: var(--color-coral-500);
    }
  }

  &.size-middle {
    .select-value {
      padding: 11px 16px;
    }
    .icon-triangle {
      margin: 17px;
    }
  }

  &.size-small {
    .select-value {
      padding: 7px 16px;
      &.multi {
        padding: 4px 24px 4px 8px;
      }
    }
    .icon-triangle {
      margin: 12px;
    }
  }
`;
