import { gql, useQuery } from '@apollo/client';

import {
  TokensEventsData,
  TokensEventsVariables,
  useGraphQLTokensEventsProps,
} from './types';

const tokensEventsQuery = gql`
  query getTokensEvents(
    $limit: Int
    $offset: Int
    $where: TokenEventWhereParams = {}
    $orderBy: TokenEventOrderByParams = {}
  ) {
    token_events(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      count
      timestamp
      data {
        action
        author
        collection_id
        fee
        result
        timestamp
        token_id
        values
        token_name
      }
    }
  }
`;

export const useGraphQLTokensEvents = ({
  limit,
  offset = 0,
  orderBy,
  tokens,
  author,
}: useGraphQLTokensEventsProps) => {
  let where: { [key: string]: unknown } = {};

  if (tokens?.length) {
    where = {
      _or: tokens.map((token) => {
        return {
          token_id: { _eq: token.tokenId },
          collection_id: { _eq: token.collectionId },
        };
      }),
    };
  }

  if (author) where.author = { _eq: author };

  const {
    data,
    error: fetchTokensEventsError,
    loading: isTokenEventsFetching,
  } = useQuery<TokensEventsData, TokensEventsVariables>(tokensEventsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit,
      offset,
      orderBy,
      where,
    },
  });

  return {
    fetchTokensEventsError,
    isTokenEventsFetching,
    timestamp: data?.token_events?.timestamp || 0,
    bundleEvents: data?.token_events?.data,
    count: data?.token_events?.count || 0,
  };
};
