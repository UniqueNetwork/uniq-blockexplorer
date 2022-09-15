import { TokenSorting } from '@app/api';

import { TokensSelectOption } from './types';

export const OPTIONS: TokensSelectOption[] = [
  {
    iconRight: { color: '#040B1D', name: 'arrow-up', size: 14 },
    id: '1',
    sortDir: 'asc_nulls_last',
    sortField: 'date_of_creation',
    title: 'NFT creation date',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrow-down', size: 14 },
    id: '2',
    sortDir: 'desc_nulls_last',
    sortField: 'date_of_creation',
    title: 'NFT creation date',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrow-up', size: 14 },
    id: '3',
    sortDir: 'asc',
    sortField: 'collection_id',
    title: 'Collection id',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrow-down', size: 14 },
    id: '4',
    sortDir: 'desc',
    sortField: 'collection_id',
    title: 'Collection id',
  },
];

export const defaultOrderBy: TokenSorting = { date_of_creation: 'desc_nulls_last' };

export const DEFAULT_PAGE_SIZE = 24;
