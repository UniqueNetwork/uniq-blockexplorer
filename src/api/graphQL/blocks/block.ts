import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';

import { LastBlocksData, LastBlocksVariables, useGraphQlBlocksProps } from './types';

const getLatestBlocksQuery = gql`
  query GetLatestBlocks($limit: Int, $offset: Int, $order_by: BlockOrderByParams, $where: BlockWhereParams) {
    block(
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      data {
        block_number
        total_events
        total_extrinsics
        timestamp
      }
      count
      timestamp
    }
  }
`;

export const useGraphQlBlocks = ({ pageSize, searchString }: useGraphQlBlocksProps) => {
  const getWhere = useCallback(
    (searchString?: string) => (searchString && searchString?.length > 0) ? ({
      _or: [
        {
          block_number: { _eq: Number(searchString) }
        }
      ]
    }) : {},
    []
  );

  const {
    data,
    error: fetchBlocksError,
    loading: isBlocksFetching
  } = useQuery<LastBlocksData, LastBlocksVariables>(getLatestBlocksQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset: 0,
      order_by: { block_number: 'desc' },
      where: getWhere(searchString)
    }
  });

  return {
    blockCount: data?.block?.count || 0,
    blocks: data?.block?.data,
    fetchBlocksError,
    isBlocksFetching,
    timestamp: data?.block?.timestamp
  };
};

export { getLatestBlocksQuery };
