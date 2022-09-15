import { SelectOptionProps } from '@app/components';
import { TokenSorting } from '@app/api';
import { ViewType } from '@app/pages/Tokens/components/TokensComponent';

export interface TokensComponentProps {
  currentPage: number;
  orderBy: TokenSorting;
  pageSize: SelectOptionProps;
  searchString?: string;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: SelectOptionProps) => void;
  setSearchString: (searchString: string | undefined) => void;
  setOrderBy: (orderBy: TokenSorting) => void;
  setTokensCount: (tokensCount: number) => void;
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
  sortDir?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
  sortField?: string;
}
