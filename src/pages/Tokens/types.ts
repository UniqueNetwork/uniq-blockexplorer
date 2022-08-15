import { SelectOptionProps } from '@unique-nft/ui-kit/dist/cjs/types';

import { TokenSorting } from '../../api/graphQL';

export interface TokensComponentProps {
  orderBy?: TokenSorting;
  pageSize?: number;
  searchString?: string;
}

export interface IconProps {
  size: number;
  name: string;
  file?: string;
  color?: string;
}

export interface TokensSelectOption extends SelectOptionProps {
  id: string;
  title: string;
  sortDir?: 'asc' | 'desc' | 'desc_nulls_last' | 'asc_nulls_last';
  sortField?: string;
}
