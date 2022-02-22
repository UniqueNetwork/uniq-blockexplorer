import { TokenSorting } from '../../api/graphQL';

export interface TokensComponentProps {
  orderBy?: TokenSorting
  pageSize?: number
  searchString?: string
}

export interface IconProps {
  size: number;
  name?: string;
  file?: string;
  color?: string;
}

export interface TokensSelectOption {
  id: number;
  title: string;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  sortDir?: 'asc' | 'desc';
  sortField?: string;
}
