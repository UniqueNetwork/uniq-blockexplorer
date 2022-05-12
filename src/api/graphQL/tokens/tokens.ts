import { gql, HttpLink, useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useEffect, useRef } from 'react';
import { TokensData, TokensVariables, useGraphQlTokensProps } from './types';

const tokensQuery = gql`
  query getTokens($limit: Int, $offset: Int, $where: view_tokens_bool_exp = {}, $orderBy: [view_tokens_order_by!] = {}) {
    view_tokens(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
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
    view_tokens_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const getSingleSearchQuery = (searchString: string): Record<string, unknown>[] => {
  return [
    { token_prefix: { _iregex: searchString } },
    ...(Number(searchString) ? [{ token_id: { _eq: searchString } }] : []),
    { collection_name: { _iregex: searchString } },
    ...(Number(searchString) ? [{ collection_id: { _eq: searchString } }] : [])
  ];
};

const getSearchQuery = (searchString: string): Record<string, unknown>[] => {
  if (!searchString.includes(',')) return getSingleSearchQuery(searchString);
  const splitSearch = searchString.trim().split(',');

  return splitSearch
    .map((searchPart: string) => Number(searchPart.trim()))
    .filter((id: number) => Number.isInteger(id))
    .map((searchPart: number) => ({ collection_id: { _eq: searchPart } }));
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
              ...getSearchQuery(searchString)
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

  useEffect(() => {
    const apolloLink = (client.link as HttpLink)?.options?.uri as string;

    if (clientRef.current && clientRef.current !== apolloLink) {
      console.log('chain changed, need to update tokens');
      void refetch();
    }

    clientRef.current = apolloLink;
  }, [client, client.link, refetch]);

  return {
    fetchTokensError,
    isTokensFetching,
    tokens: data?.view_tokens,
    tokensCount: data?.view_tokens_aggregate.aggregate.count || 0
  };
};

export const useGraphQlToken = (collectionId: string, tokenId: string) => {
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
    token: data?.view_tokens[0] || undefined
  };
};

export { tokensQuery };
