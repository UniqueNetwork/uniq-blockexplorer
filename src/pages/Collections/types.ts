import { Collection } from '../../api/graphQL/';

export type CollectionsComponentProps = {
  data?: Collection[]
  count: number
  pageSize: number
  loading: boolean
  onPageChange: (limit: number, offset: number) => Promise<unknown>
}
