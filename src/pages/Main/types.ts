import { ApolloQueryResult } from '@apollo/client'

type BlockComponentProps<T> = {
  data?: T
  pageSize: number
  page?: number,
  onPageChange: (limit: number, offset: number) => void
}

export type { BlockComponentProps }
