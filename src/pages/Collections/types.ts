import { CollectionSorting } from '@app/api';

export type CollectionsComponentProps = {
  currentPage: number;
  pageSize?: number;
  orderBy?: CollectionSorting;
  setCurrentPage: (page: number) => void;
};
