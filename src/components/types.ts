import { ChangeEvent, KeyboardEvent, ReactNode } from 'react';

import { SVGIconProps } from '@app/components/SVGIcon';

export type ComponentType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLDivElement
  | HTMLTextAreaElement;

export type DimentionType = 'small' | 'middle' | 'large';

export interface ComponentProps {
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  name?: string;
  placeholder?: string;
  tabIndex?: number;
  value?: string | undefined;
  testid?: string;
  onChange(value: SelectOptionProps[] | SelectOptionProps | string | undefined): void;
  onBlur?(event: ChangeEvent<ComponentType>): void;
  onFocus?(event: ChangeEvent<ComponentType>): void;
  onKeyDown?(event: KeyboardEvent<ComponentType>): void;
}

export interface SelectOptionProps {
  [x: string | number | symbol]: unknown;
  iconLeft?: SVGIconProps;
  iconRight?: SVGIconProps;
}

export interface DropdownOptionProps {
  [x: string | number | symbol]: unknown;
  iconLeft?: SVGIconProps;
  iconRight?: SVGIconProps | ReactNode;
}
