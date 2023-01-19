import { AttributeValue, CollectionAttribute } from '@app/api/graphQL/attributes/types';
import { Token } from '@app/api';

export interface TokensVariables {
  limit: number;
  offset: number;
  where?: Record<string, unknown>;
  orderBy?: TokenSorting;
  attributesFilter?: TokenAttributeFilterItem[];
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

export type useGraphQlTokensForAttributesProps = {
  collectionId?: number;
  attributesFilter?: ChosenAttributesMap;
};

export type ChosenAttribute = AttributeValue & Pick<CollectionAttribute, 'key'>;

export type ChosenAttributesMap = {
  [key: string]: ChosenAttribute;
};
