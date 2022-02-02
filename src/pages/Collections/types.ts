import { CollectionSorting } from '../../api/graphQL/';

export type CollectionsComponentProps = {
  searchString?: string
  pageSize?: number
  orderBy?: CollectionSorting
}
