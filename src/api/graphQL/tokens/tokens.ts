import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { FetchMoreTokensOptions, TokensData, TokensVariables, useGraphQlTokensProps } from './types';

const tokensQuery = gql`
  query getTokens($limit: Int, $offset: Int, $where: view_tokens_bool_exp = {}) {
    view_tokens(where: $where, limit: $limit, offset: $offset) {
      collection_cover
      collection_description
      collection_id
      collection_name
      data
      owner
      image_path
      token_id
      token_prefix
    }
    view_tokens_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const useGraphQlTokens = ({
  filter, pageSize
}: useGraphQlTokensProps) => {
  const getWhere = useCallback(
    (searchString?: string) => ({
      _and: {
        ...(filter ? { _or: filter } : {}),
        ...(searchString
          ? {
            _or: {
              collection_name: { _ilike: searchString },
              token_prefix: { _ilike: searchString }
            }
          }
          : {})
      }
    }),
    [filter]
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
      where: getWhere()
    }
  });

  const fetchMoreTokens = useCallback(
    ({
      limit = pageSize, offset, searchString
    }: FetchMoreTokensOptions) => {
      return fetchMore({
        variables: {
          limit,
          offset,
          where: getWhere(searchString)
        }
      });
    },
    [fetchMore, getWhere, pageSize]
  );

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
      where: { token_id: { _eq: tokenId } }
    }
  });

  return {
    fetchTokensError,
    isTokensFetching,
    token: data?.view_tokens[0] || undefined
  };
};

export { tokensQuery };
