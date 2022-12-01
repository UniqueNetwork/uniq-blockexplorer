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
        tokens
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
  let where: { [key: string]: unknown };

  if (tokens?.length) {
    const collectionMap = new Map();
    tokens.forEach((token) => {
      const tokensInCollectionMap = collectionMap.get(token.collectionId);

      if (!!tokensInCollectionMap) {
        collectionMap.set(token.collectionId, [...tokensInCollectionMap, token.tokenId]);
      } else {
        collectionMap.set(token.collectionId, [token.tokenId]);
      }
    });

    const tokensFilter: { [key: string]: unknown }[] = [];
    collectionMap.forEach((tokens, collectionId) => {
      tokensFilter.push({
        collection_id: { _eq: collectionId },
        token_id: { _in: tokens },
      });
    });
    where = {
      _or: tokensFilter,
    };
  } else {
    where = {
      _or: {
        collection_id: { _eq: -1 },
        token_id: { _in: -1 },
      },
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
    tokensEvents: data?.token_events?.data,
    count: data?.token_events?.count || 0,
  };
};
