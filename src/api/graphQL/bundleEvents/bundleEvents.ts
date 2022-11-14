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
    where = {
      _or: tokensInBundle.map((token) => {
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
