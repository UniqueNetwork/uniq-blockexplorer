import classNames from 'classnames';
import { InputBaseProps } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';
import React, { forwardRef } from 'react';

import { ComponentProps } from '../types';

export type InputTagProps = Omit<InputBaseProps, 'onChange'> &
  Omit<
    ComponentProps,
    | 'value'
    | 'onChange'
    | 'defaultValue'
    | 'autoFocus'
    | 'onFocus'
    | 'onKeyDown'
    | 'tabIndex'
    | 'maxLength'
  > & {
    value?: string[];
    onChange?: (tags: string[]) => void;
    seprators?: string[];
    onExisting?: (tag: string) => void;
    onRemoved?: (tag: string) => void;
    disabled?: boolean;
    isEditOnRemove?: boolean;
    beforeAddValidate?: (tag: string, existingTags: string[]) => boolean;
  };

export const InputTag = forwardRef<HTMLDivElement, InputTagProps>(
  (
    {
      id,
      label,
      additionalText,
      statusText,
      className,
      size = 'middle',
      testid,
      error,
      disabled,
      value,
      onRemoved,
    },
    ref,
  ) => {
    return (
      <Wrapper
        className={classNames('unique-input-tag', `size-${size}`, className, {
          error,
          disabled,
        })}
        id={id}
        data-testid={testid}
      >
        {label && <label htmlFor={id}>{label}</label>}
        {additionalText && <div className="additional-text">{additionalText}</div>}
        <TagsContainer ref={ref}>
          {value?.map((item) => (
            <Tag label={item} key={item} onRemove={onRemoved} />
          ))}
        </TagsContainer>
        {statusText && <div className="status-text">{statusText}</div>}
      </Wrapper>
    );
  },
);

type TagProps = {
  label: string;
  onRemove?(label: string): void;
};

const Tag = ({ label, onRemove }: TagProps) => {
  const onRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove?.(label);
  };

  return (
    <TagStyled>
      <span>{label}</span>
      <button onClick={onRemoveClick}>✕</button>
    </TagStyled>
  );
};

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: none;
  outline: none;
  min-height: 24px;
  max-height: 50px;
  overflow: hidden;
  line-height: 1.4;
  align-items: center;
  padding: calc(var(--prop-gap) / 2) var(--prop-gap);
  gap: calc(var(--prop-gap) / 2);
`;

const TagStyled = styled.div`
  word-break: unset;
  flex-shrink: 0;
  background: var(--color-primary-300);
  color: var(--color-additional-light);
  border-radius: var(--prop-border-radius);
  padding: 1px calc(var(--prop-gap) / 2);
  display: flex;
  align-items: baseline;
  justify-content: center;
  column-gap: calc(var(--prop-gap) / 4);
  & button {
    color: var(--color-additional-light);
    padding: 0;
    width: 16px;
    background: none;
    border: 0;
    cursor: pointer;
    line-height: inherit;
  }
`;

const Wrapper = styled.div`
  font-family: var(--prop-font-family);
  font-size: var(--prop-font-size);
  font-weight: var(--prop-font-weight);
  position: relative;

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
    font-size: var(--prop-font-size);
    height: 22px;
    line-height: 22px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .rti {
    &--container {
      border: 1px solid var(--color-grey-300);
      border-radius: var(--prop-border-radius);
      position: relative;

      &:hover {
        border: 1px solid var(--color-grey-500);
      }

      &:focus-within {
        border: 1px solid var(--color-grey-400);
        box-shadow: none;
      }
    }
    &--input {
      padding: unset;
      flex-grow: 1;
    }
    &--tag {
      background: var(--color-primary-300);
      color: var(--color-additional-light);
      border-radius: var(--prop-border-radius);
      padding: 1px calc(var(--prop-gap) / 2);
      align-items: baseline;
      display: flex;
      column-gap: calc(var(--prop-gap) / 4);
      word-break: break-word;
      button {
        color: var(--color-additional-light);
        padding: 0;
        width: 16px;
        &:hover {
          color: var(--color-additional-light);
        }
      }
    }
  }

  .status-text {
    color: var(--color-grey-500);
    font-size: var(--prop-font-size);
    line-height: 22px;
    margin-top: calc(var(--prop-gap) / 2);
    min-height: 22px;
    width: 100%;
  }

  &.error,
  &.error:focus-within {
    .rti {
      &--container {
        border: 1px solid var(--color-coral-700);
      }
    }
    .status-text {
      color: var(--color-coral-700);
    }
  }

  &.disabled {
    .rti {
      &--container {
        background-color: var(--color-grey-100);
      }
      &--input {
        background-color: var(--color-grey-100);
        &::placeholder {
          color: var(--color-grey-400);
        }
      }
      &--tag {
        background-color: var(--color-blue-grey-300);
      }
    }
  }

  &.size-middle {
    .rti {
      &--container {
        padding: calc(var(--prop-gap) / 2) var(--prop-gap);
      }
      &--input {
        font-weight: var(--prop-font-weight);
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  &.size-small {
    .rti {
      &--container {
        padding: calc(var(--prop-gap) / 4) calc(var(--prop-gap) / 2);
      }
      &--input {
        font-weight: 500;
        font-size: var(--prop-font-size);
        line-height: 22px;
      }
    }
  }
`;
