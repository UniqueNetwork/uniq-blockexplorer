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
  id: string | number;
  title: string | number;
  iconLeft?: IconProps;
  iconRight?: IconProps;
  sortDir?: 'asc' | 'desc';
  sortField?: 'date_of_creation' | 'collection_id';
}
