import { Collection } from '../../api/graphQL/';

export type CollectionsComponentProps = {
  className?: string
  data?: Collection[]
  count: number
  pageSize: number
  loading: boolean
  onPageChange: (limit: number, offset: number) => Promise<unknown>
}
