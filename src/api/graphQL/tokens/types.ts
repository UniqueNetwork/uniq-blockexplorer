import { DecodedAttributes } from '@unique-nft/api';

export interface TokensVariables {
  limit: number;
  offset: number;
  where?: Record<string, unknown>;
  orderBy?: TokenSorting;
}

export interface Token {
  attributes: DecodedAttributes;
  burned: boolean;
  token_id: number;
  collection_id: number;
  collection_name: string;
  image: {
    fullUrl: string | null;
  };
  date_of_creation: number;
  token_prefix: string;
  owner: string;
  owner_normalized: string;
  image_path: string;
  collection_cover: string;
  collection_description: string;
  transfers_count: number;
  type: 'NFT' | 'Nested' | 'Fractional';
}

export interface TokensData {
  tokens: {
    data: Token[];
    count: number;
    timestamp: number;
  };
}

export type TokenSorting = {
  [P in keyof Token]?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
};

export type useGraphQlTokensProps = {
  pageSize: number;
  filter?: Record<string, unknown>;
  offset: number;
  orderBy?: TokenSorting;
  collectionId?: string;
  searchString?: string;
};
