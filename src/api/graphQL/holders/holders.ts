import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';

import { HoldersData, HoldersVariables, useGraphQlHoldersProps } from './types';

const holdersQuery = gql`
  query getHolders(
    $limit: Int
    $offset: Int
    $where: HolderWhereParams = {}
    $orderBy: HolderOrderByParams = {}
  ) {
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

export const useGraphQlHolders = ({
  filter,
  offset,
  orderBy,
  pageSize,
}: useGraphQlHoldersProps) => {
  const getWhere = useCallback(
    (filter?: Record<string, unknown>) => ({
      _and: {
        ...(filter || {}),
      },
    }),
    [],
  );

  const {
    data,
    error: fetchHoldersError,
    loading: isHoldersFetching,
  } = useQuery<HoldersData, HoldersVariables>(holdersQuery, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset,
      orderBy,
      where: getWhere(filter),
    },
  });

  return {
    fetchHoldersError,
    holders: data?.holders?.data,
    holdersCount: data?.holders?.count || 0,
    isHoldersFetching,
  };
};

export { holdersQuery };
