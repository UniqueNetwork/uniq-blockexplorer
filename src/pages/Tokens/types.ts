import { Token } from '../../api/graphQL';

export interface TokensComponentProps {
  data?: Token[]
  count: number
  pageSize: number
  loading: boolean
  onPageChange: (limit: number, offset: number) => Promise<unknown>
}
