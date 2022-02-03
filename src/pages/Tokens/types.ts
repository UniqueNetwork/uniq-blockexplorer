import { TokenSorting, Token } from '../../api/graphQL';

export interface TokensComponentProps {
  orderBy?: TokenSorting
  pageSize?: number
  searchString?: string
}
