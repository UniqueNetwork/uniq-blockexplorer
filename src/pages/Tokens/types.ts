import { SelectOptionProps } from '@unique-nft/ui-kit/dist/cjs/types';

import { TokenSorting } from '@app/api';
import { ViewType } from '@app/pages/Tokens/components/TokensComponent';

export interface TokensComponentProps {
  currentPage: number;
  orderBy: TokenSorting;
  pageSize: number;
  searchString?: string;
  setCurrentPage: (currentPage: number) => void;
  setSearchString: (searchString: string | undefined) => void;
  setOrderBy: (orderBy: TokenSorting) => void;
  view: ViewType;
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
