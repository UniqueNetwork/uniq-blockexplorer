import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { Token } from '@app/api';

import {
  TokenAttributeFilterItem,
  TokensData,
  TokensVariables,
  useGraphQlTokensForAttributesProps,
} from './types';

const tokensQuery = gql`
  query getTokens(
    $limit: Int
    $offset: Int
    $where: TokenWhereParams = {}
    $orderBy: TokenOrderByParams = {}
    $attributesFilter: [AttributeV1FilterValue!]
  ) {
    tokens(
      where: $where
      limit: $limit
      offset: $offset
      order_by: $orderBy
      attributes_v1_filter: $attributesFilter
    ) {
      data {
        attributes: attributes_v1
      }
      count
      timestamp
    }
  }
`;

export const useGraphQlTokensForAttributes = ({
  collectionId,
  attributesFilter,
}: useGraphQlTokensForAttributesProps) => {
  const where = {
    collection_id: { _eq: collectionId },
    burned: { _eq: 'false' },
    _or: [{ type: { _eq: 'NFT' } }, { type: { _eq: 'RFT' } }],
  };

  const getAttributes = () => {
    if (!attributesFilter) return [];

    const selectedAttributesForApiCall: TokenAttributeFilterItem[] = [];
    for (let key in attributesFilter) {
      selectedAttributesForApiCall.push({
        key: attributesFilter[key].key,
        raw_value: attributesFilter[key].raw_value,
      });
    }

    return selectedAttributesForApiCall;
  };
  const getAttributesFilter = getAttributes();

  const {
    data,
    error: fetchTokensError,
    loading: isTokensFetching,
  } = useQuery<TokensData, TokensVariables>(tokensQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: 2_147_483_647,
      where,
      attributesFilter: getAttributesFilter,
    },
  });

  return useMemo(
    () => ({
      fetchTokensError,
      isTokensFetching,
      timestamp: data?.tokens?.timestamp || 0,
      tokens: data?.tokens?.data as Token[] | undefined,
      tokensCount: data?.tokens?.count || 0,
    }),
    [
      data?.tokens?.count,
      data?.tokens?.data,
      data?.tokens?.timestamp,
      fetchTokensError,
      isTokensFetching,
    ],
  );
};

export { tokensQuery };
