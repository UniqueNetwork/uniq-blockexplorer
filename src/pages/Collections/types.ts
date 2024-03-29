import { CollectionSorting, TokenSorting, TokenTypeEnum } from '@app/api';
import { SelectOptionProps, ViewType } from '@app/components';

export type CollectionsComponentProps = {
  currentPage: number;
  pageSize?: number;
  orderBy?: CollectionSorting;
  setCurrentPage: (page: number) => void;
};

export interface CollectionsSelectOption extends SelectOptionProps {
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
