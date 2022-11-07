import { Token } from '@app/api';

export interface BundlesVariables {
  limit: number;
  offset: number;
  where?: Record<string, unknown>;
  orderBy?: BundleSorting;
}

export interface BundlesData {
  tokenBundles: {
    data: Token[];
    count: number;
    timestamp: number;
  };
}

export type BundleSorting = {
  [P in keyof Token]?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
};

export type useGraphQlBundlesProps = {
  pageSize: number;
  filter?: Record<string, unknown>;
  offset: number;
  orderBy?: BundleSorting;
  collectionId?: string;
  searchString?: string;
};
