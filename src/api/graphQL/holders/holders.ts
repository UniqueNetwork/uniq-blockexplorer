import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';

import { FetchMoreHoldersOptions, HoldersData, HoldersVariables, useGraphQlHoldersProps } from './types';

const holdersQuery = gql`
query getHolders($limit: Int, $offset: Int, $where: HolderWhereParams = {}, $orderBy: HolderOrderByParams = {}) {
  holders(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
    data {
      collection_id
      owner
      owner_normalized
      count
    }
    count
  }
}
`;

export const useGraphQlHolders = ({ filter, orderBy, pageSize }: useGraphQlHoldersProps) => {
  const client = useApolloClient();

  const getWhere = useCallback(
    (filter?: Record<string, unknown>) => ({
      _and: {
        ...(filter || {})
      }
    }),
    []
  );

  const {
    data,
    error: fetchHoldersError,
    fetchMore,
    loading: isHoldersFetching
  } = useQuery<HoldersData, HoldersVariables>(holdersQuery, {
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

  const fetchMoreHolders = useCallback(
    ({ limit = pageSize, offset, orderBy, filter }: FetchMoreHoldersOptions) => {
      return fetchMore({
        variables: {
          limit,
          offset,
          orderBy,
          where: getWhere(filter)
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
    fetchHoldersError,
    fetchMoreHolders,
    holders: data?.holders?.data,
    holdersCount: data?.holders?.count || 0,
    isHoldersFetching
  };
};

export { holdersQuery };
