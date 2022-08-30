export interface AttributeField {
  isArray: boolean;
  name: {
    _: string;
  };
  optional: boolean;
  type: string;
}

export interface Attributes {
  [key: string]: AttributeField;
}

export interface Collection {
  attributes_schema: Attributes;
  collection_cover: string;
  collection_id: number;
  description: string;
  name: string;
  offchain_schema: string;
  owner: string;
  owner_normalized: string;
  token_limit: number;
  token_prefix: string;
  tokens_count: number;
  transfers_count: number;
  holders_count: number;
  type: string;
  mint_mode: string;
  owner_can_transfer: string;
  owner_can_destroy: string;
  schema_version: string;
  actions_count: number;
  limits_account_ownership: number;
  limits_sponsore_data_rate: null;
  limits_sponsore_data_size: null;
  const_chain_schema: null;
  date_of_creation: number;
}

export interface CollectionsVariables {
  limit: number;
  offset: number;
  where?: Record<string, unknown>;
  orderBy?: Record<string, 'asc' | 'desc' | 'desc_nulls_last' | 'asc_nulls_last'>;
}

export interface CollectionsData {
  collections: {
    data: Collection[];
    count: number;
    timestamp: number;
  };
}

export type CollectionSorting = {
  [P in keyof Collection]?: 'asc' | 'desc' | 'desc_nulls_last' | 'asc_nulls_last';
};

export type useGraphQlCollectionsProps = {
  pageSize: number;
  offset?: number;
  orderBy?: CollectionSorting;
  filter?: Record<string, unknown>;
  searchString?: string;
};

export type FetchMoreCollectionsOptions = {
  limit?: number;
  offset?: number;
  searchString?: string;
  orderBy?: CollectionSorting;
  filter?: Record<string, unknown>;
};
