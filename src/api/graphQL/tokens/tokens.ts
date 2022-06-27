import { gql, HttpLink, useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useEffect, useRef } from 'react';
import { TokensData, TokensVariables, useGraphQlTokensProps } from './types';

const tokensQuery = gql`
  query getTokens($limit: Int, $offset: Int, $where: TokenWhereParams = {}, $orderBy: TokenOrderByParams = {}) {
    tokens(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      data {
        collection_cover
        collection_description
        collection_id
        collection_name
        data
        date_of_creation
        owner
        owner_normalized
        image_path
        token_id
        token_prefix
      }
      count
    }
  }
`;

const getSingleSearchQuery = (searchString: string): Record<string, unknown>[] => {
  return [
    { token_prefix: { _ilike: `%${searchString}%` } },
    ...(Number(searchString) ? [{ token_id: { _eq: Number(searchString) } }] : []),
    { collection_name: { _ilike: `%${searchString}%` } },
    ...(Number(searchString) ? [{ collection_id: { _eq: Number(searchString) } }] : [])
  ];
};

const getSearchQuery = (searchString: string): Record<string, unknown>[] => {
  if (!searchString.includes(',')) return getSingleSearchQuery(searchString);
  const splitSearch = searchString.trim().split(',');

  return splitSearch
    .map((searchPart: string) => Number(searchPart.trim()))
    .filter((id: number) => Number.isInteger(id))
    .map((searchPart: number) => ({ collection_id: { _eq: Number(searchPart) } }));
};

export const useGraphQlTokens = ({ filter, offset, orderBy, pageSize, searchString }: useGraphQlTokensProps) => {
  const client = useApolloClient();
  const clientRef = useRef<string>();

  const getWhere = useCallback(
    (filter?: Record<string, unknown>, searchString?: string) => ({
      _and: {
        ...(filter || {}),
        ...(searchString
          ? {
            _or: [
              ...getSearchQuery(searchString),
              { owner: { _eq: searchString } },
              { owner_normalized: { _eq: searchString } }
            ]
          }
          : {})
      }
    }),
    []
  );

  const {
    data,
    error: fetchTokensError,
    loading: isTokensFetching,
    refetch
  } = useQuery<TokensData, TokensVariables>(tokensQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset,
      orderBy,
      where: getWhere(filter, searchString)
    }
  });

  return {
    fetchTokensError,
    isTokensFetching,
    tokens: data?.tokens?.data,
    tokensCount: data?.tokens?.count || 0
  };
};

export const useGraphQlToken = (collectionId: number, tokenId: number) => {
  const {
    data,
    error: fetchTokensError,
    loading: isTokensFetching
  } = useQuery<TokensData, TokensVariables>(tokensQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 1,
      offset: 0,
      where: { collection_id: { _eq: collectionId }, token_id: { _eq: tokenId } }
    }
  });

  return {
    fetchTokensError,
    isTokensFetching,
    token: data?.tokens?.data[0] || undefined
  };
};

export { tokensQuery };
