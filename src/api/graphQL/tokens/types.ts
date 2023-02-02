import { DecodedAttributes } from '@unique-nft/api';

import { AttributeValue, CollectionAttribute } from '@app/api/graphQL/attributes/types';

export interface TokensVariables {
  limit: number;
  offset: number;
  where?: Record<string, unknown>;
  orderBy?: TokenSorting;
  attributesFilter?: TokenAttributeFilterItem[];
}

export enum TokenTypeEnum {
  NFT = 'NFT',
  RFT = 'RFT',
}

export interface Token {
  attributes: DecodedAttributes;
  bundle_created: number;
  burned: boolean;
  token_id: number;
  children_count: number;
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
  parent_id: string;
  transfers_count: number;
  total_pieces: number;
  type: TokenTypeEnum;
  nested: boolean;
  tokens_owner: string;
  tokens_amount: string;
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

export type TokenAttributeFilterItem = {
  key: string;
  raw_value: string;
};

export type useGraphQlTokensProps = {
  pageSize: number;
  filter?: Record<string, unknown>;
  offset: number;
  orderBy?: TokenSorting;
  collectionId?: string;
  searchString?: string;
  attributesFilter?: ChosenAttributesMap;
};

export type ChosenAttribute = AttributeValue & Pick<CollectionAttribute, 'key'>;

export type ChosenAttributesMap = {
  [key: string]: ChosenAttribute;
};
