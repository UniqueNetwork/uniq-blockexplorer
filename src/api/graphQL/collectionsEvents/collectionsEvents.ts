import { gql, useQuery } from '@apollo/client';

import {
  CollectionsEventsData,
  CollectionsEventsVariables,
  useGraphQLCollectionsEventsProps,
} from './types';

const collectionsEventsQuery = gql`
  query getCollectionsEvents(
    $limit: Int
    $offset: Int
    $where: CollectionEventWhereParams = {}
    $orderBy: CollectionEventOrderByParams = {}
  ) {
    collection_events(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      count
      timestamp
      data {
        action
        author
        collection_id
        fee
        result
        timestamp
      }
    }
  }
`;

export const useGraphQLCollectionsEvents = ({
  limit,
  offset = 0,
  orderBy,
  collection_id,
}: useGraphQLCollectionsEventsProps) => {
  const where = { collection_id: { _eq: collection_id } };

  const {
    data,
    error: fetchCollectionsEventsError,
    loading: isCollectionsEventsFetching,
  } = useQuery<CollectionsEventsData, CollectionsEventsVariables>(
    collectionsEventsQuery,
    {
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
    },
  );

  return {
    fetchCollectionsEventsError,
    isCollectionsEventsFetching,
    timestamp: data?.collection_events?.timestamp || 0,
    collectionsEvents: data?.collection_events?.data,
    count: data?.collection_events?.count || 0,
  };
};
