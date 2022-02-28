import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { FetchMoreTokensOptions, TokensData, TokensVariables, useGraphQlTokensProps } from './types';

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
  const searchQuery = splitSearch
    .map((searchPart: string) => Number(searchPart.trim()))
    .filter((id: number) => Number.isInteger(id))
    .map((searchPart: number) => ({ collection_id: { _eq: searchPart } }));

  return searchQuery;
};

export const useGraphQlTokens = ({ filter, orderBy, pageSize }: useGraphQlTokensProps) => {
  const client = useApolloClient();

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
    fetchMore,
    loading: isTokensFetching
  } = useQuery<TokensData, TokensVariables>(tokensQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset: 0,
      orderBy,
      where: getWhere(filter)
    }
  });

  const fetchMoreTokens = useCallback(
    ({ limit = pageSize, offset, searchString, orderBy, filter }: FetchMoreTokensOptions) => {
      return fetchMore({
        variables: {
          limit,
          offset,
          orderBy,
          where: getWhere(filter, searchString)
        }
      });
    },
    [fetchMore, getWhere, pageSize]
  );

  useEffect(() => {
    fetchMore({})
      .catch((errMsg) => {
        throw new Error(errMsg);
      });
  }, [client.link, fetchMore]);

  return {
    fetchMoreTokens,
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
