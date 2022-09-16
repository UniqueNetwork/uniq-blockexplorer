import { SelectOptionProps } from '@app/components';

export interface IconProps {
  size: number;
  name: string;
  file?: string;
  color?: string;
}

export interface TokensSelectOption extends SelectOptionProps {
  id: string;
  title: string;
  sortDir?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
  sortField?: string;
}
