import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
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
      timestamp
    }
  }
`;

const parseSearchString = (searchString: string): { num?: number, str?: string } => {
  let num, str;
  const queries = searchString.split(' ');

  queries.map((query) => {

    let param = query;

    // if first symbol is '#', trim it
    if (query.charCodeAt(0) === 35) {
      param = query.substr(1);
    }

    if (query === '') {
      return;
    }

    if (isNaN(parseInt(param))) {
      str = param;
    } else if (typeof parseInt(param) === 'number') {
      num = parseInt(param);
    }
  });

  return { num, str };
};

const getSingleSearchQuery = (searchString: string): Record<string, unknown>[] => {
  return [
    { token_prefix: { _ilike: `%${parseSearchString(searchString).str || searchString}%` } },
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
  if (searchString) {
    parseSearchString(searchString);
  }

  // if searchString contain number and text we'll be looking for by token_prefix and token_id
  const searchByTokenPrefixAndId = searchString && parseSearchString(searchString).num && parseSearchString(searchString).str;

  const getWhere = (
    (filter?: Record<string, unknown>, searchString?: string) => ({
      _and: {
        ...(filter || {}),
        ...(searchString && searchByTokenPrefixAndId ? {
          token_id: { _eq: parseSearchString(searchString).num },
          token_prefix: { _ilike: `%${parseSearchString(searchString).str}%` }
        } : {}),
        ...(searchString
          ? {
            _or: [
              ...getSearchQuery(searchString),
              // Why is there an address search if the address never gets here?
              { owner: { _eq: searchString } },
              { owner_normalized: { _eq: searchString } }
            ]
          }
          : {})
      }
    }));

  const where = getWhere(filter, searchString);

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
      limit: pageSize,
      offset,
      orderBy,
      where,
    }
  });

  return useMemo(() => ({
    fetchTokensError,
    isTokensFetching,
    timestamp: data?.tokens?.timestamp,
    tokens: data?.tokens?.data,
    tokensCount: data?.tokens?.count || 0
  }), [data?.tokens?.count, data?.tokens?.data, data?.tokens?.timestamp, fetchTokensError, isTokensFetching]);
};

export const useGraphQlToken = (collectionId: number, tokenId: number) => {
  const where = { collection_id: { _eq: collectionId }, token_id: { _eq: tokenId } };

  const {
    data,
    error: fetchTokensError,
    loading: isTokensFetching
  } = useQuery<TokensData, TokensVariables>(tokensQuery, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 1,
      offset: 0,
      where
    }
  });

  return {
    fetchTokensError,
    isTokensFetching,
    timestamp: data?.tokens?.timestamp,
    token: data?.tokens?.data[0] || undefined
  };
};

export { tokensQuery };
