import { TokenSorting } from '@app/api';

import { TokensSelectOption } from './types';
// transfers_count
export const OPTIONS: TokensSelectOption[] = [
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '1',
    sortDir: 'asc_nulls_first',
    sortField: 'token_id',
    title: 'Item',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '2',
    sortDir: 'desc_nulls_last',
    sortField: 'token_id',
    title: 'Item',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '3',
    sortDir: 'asc_nulls_first',
    sortField: 'date_of_creation',
    title: 'Created',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '4',
    sortDir: 'desc_nulls_last',
    sortField: 'date_of_creation',
    title: 'Created',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '5',
    sortDir: 'asc_nulls_first',
    sortField: 'collection_id',
    title: 'Collection',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '6',
    sortDir: 'desc_nulls_last',
    sortField: 'collection_id',
    title: 'Collection',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '7',
    sortDir: 'asc_nulls_first',
    sortField: 'transfers_count',
    title: 'Transfers',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '8',
    sortDir: 'desc_nulls_last',
    sortField: 'transfers_count',
    title: 'Transfers',
  },
];

export const defaultOrderBy: TokenSorting = { date_of_creation: 'desc_nulls_last' };
export const defaultOrderId = 4;
export const defaultSorting: string = 'date_of_creation-desc_nulls_last';

export const DEFAULT_PAGE_SIZE = 24;
