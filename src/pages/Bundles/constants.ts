import { BundleSorting } from '@app/api';

import { BundlesSelectOption } from './types';
export const OPTIONS: BundlesSelectOption[] = [
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '1',
    sortDir: 'desc_nulls_last',
    sortField: 'token_prefix',
    title: 'Token name',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '2',
    sortDir: 'asc_nulls_first',
    sortField: 'token_prefix',
    title: 'Token name',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '3',
    sortDir: 'desc_nulls_last',
    sortField: 'date_of_creation',
    title: 'Bundle created',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '4',
    sortDir: 'asc_nulls_first',
    sortField: 'date_of_creation',
    title: 'Bundle created',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '5',
    sortDir: 'desc_nulls_last',
    sortField: 'collection_name',
    title: 'Collection name',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '6',
    sortDir: 'asc_nulls_first',
    sortField: 'collection_name',
    title: 'Collection name',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '7',
    sortDir: 'desc_nulls_last',
    sortField: 'children_count',
    title: 'Nested items',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '8',
    sortDir: 'asc_nulls_first',
    sortField: 'children_count',
    title: 'Nested items',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowDown', height: 14, width: 14 },
    id: '9',
    sortDir: 'desc_nulls_last',
    sortField: 'transfers_count',
    title: 'Transfers',
  },
  {
    iconRight: { color: '#040B1D', name: 'arrowUp', height: 14, width: 14 },
    id: '10',
    sortDir: 'asc_nulls_first',
    sortField: 'transfers_count',
    title: 'Transfers',
  },
];

export const defaultOrderBy: BundleSorting = { date_of_creation: 'desc_nulls_last' };
export const defaultSorting: string = 'date_of_creation-desc_nulls_last';
export const defaultOrderId = 3;

export const DEFAULT_PAGE_SIZE = 24;
