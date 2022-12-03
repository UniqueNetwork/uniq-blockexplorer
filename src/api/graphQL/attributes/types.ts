import { LocalizedStringWithDefault } from '@unique-nft/api';

export interface CollectionAttribute {
  key: string;
  name: LocalizedStringWithDefault;
  values: AttributeValue[];
}

export type AttributeValue = {
  raw_value: string;
  tokens_count: number;
  value: LocalizedStringWithDefault | string;
};

export type AttributesSorting = {
  [P in keyof CollectionAttribute]?:
  | 'asc'
  | 'desc'
  | 'desc_nulls_last'
  | 'asc_nulls_last'
  | 'asc_nulls_first'
  | 'desc_nulls_first';
};

export interface CollectionAttributesVariables {
  where: Record<string, unknown>;
  orderBy?: AttributesSorting;
}

export interface CollectionAttributesData {
  attributes: {
    data: CollectionAttribute[];
    count: number;
    timestamp: number;
  }
}

export type useGraphQLCollectionAttributesProps = {
  orderBy?: AttributesSorting;
  collectionId: number;
};
