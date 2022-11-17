import { gql, useQuery } from '@apollo/client';

import {
  BundleEventsData,
  BundleEventsVariables,
  useGraphQLBundleEventsProps,
} from './types';

const bundleEventsQuery = gql`
  query getBundleEvents(
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
      }
    }
  }
`;

export const useGraphQLBundleEvents = ({
  limit,
  offset = 0,
  orderBy,
  tokensInBundle,
  author,
}: useGraphQLBundleEventsProps) => {
  let where: { [key: string]: unknown } = {};

  if (tokensInBundle?.length) {
    const collectionMap = new Map();
    tokensInBundle.forEach((token) => {
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
  }

  if (author) where.author = { _eq: author };

  const {
    data,
    error: fetchBundleEventsError,
    loading: isBundleEventsFetching,
  } = useQuery<BundleEventsData, BundleEventsVariables>(bundleEventsQuery, {
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
    fetchBundleEventsError,
    isBundleEventsFetching,
    timestamp: data?.token_events?.timestamp || 0,
    bundleEvents: data?.token_events?.data,
    count: data?.token_events?.count || 0,
  };
};
