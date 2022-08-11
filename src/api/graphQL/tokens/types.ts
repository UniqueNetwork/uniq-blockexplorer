import { DecodedAttributes } from '@unique-nft/api';

export interface TokensVariables {
  limit: number
  offset: number
  where?: Record<string, unknown>
  orderBy?: Record<string, 'asc' | 'desc' | 'desc_nulls_last' | 'asc_nulls_last'>
}

export interface Token {
  attributes: DecodedAttributes;
  token_id: number
  collection_id: number
  collection_name: string
  image: {
    fullUrl: string | null;
  }
  date_of_creation: number
  token_prefix: string
  owner: string
  owner_normalized: string;
  image_path: string
  collection_cover: string
  collection_description: string
}

export interface TokensData {
  tokens: {
    data: Token[];
    count: number;
    timestamp: number;
  }
}

export type TokenSorting = {
  [P in keyof Token]?: 'asc' | 'desc' | 'desc_nulls_last' | 'asc_nulls_last'
}

export type useGraphQlTokensProps = {
  pageSize: number;
  filter?: Record<string, unknown>;
  offset: number;
  orderBy?: TokenSorting;
  collectionId?: string;
  searchString?: string;
}

export type FetchMoreTokensOptions = {
  limit?: number
  offset?: number
  searchString?: string
  orderBy?: TokenSorting
  filter?: Record<string, unknown>
}
