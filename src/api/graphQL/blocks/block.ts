import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { LastBlocksData, LastBlocksVariables, FetchMoreBlocksOptions, useGraphQlBlocksProps } from './types';

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

export const useGraphQlBlocks = ({ pageSize }: useGraphQlBlocksProps) => {
  const client = useApolloClient();

  const {
    data,
    error: fetchBlocksError,
    fetchMore,
    loading: isBlocksFetching
  } = useQuery<LastBlocksData, LastBlocksVariables>(getLatestBlocksQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: { limit: pageSize, offset: 0, order_by: { block_number: 'desc' } }
  });

  useEffect(() => {
    fetchMore({})
      .catch((errMsg) => {
        throw new Error(errMsg);
      });
  }, [client.link, fetchMore]);

  const fetchMoreBlocks = useCallback(
    ({ limit = pageSize, offset, searchString }: FetchMoreBlocksOptions) => {
      return fetchMore({
        variables: {
          limit,
          offset,
          where:
            (searchString &&
              searchString.length > 0 && {
              _or: [
                {
                  block_number: { _eq: Number(searchString) }
                }
              ]
            }) ||
            undefined
        }
      });
    },
    [fetchMore, pageSize]
  );

  return {
    blockCount: data?.block?.count || 0,
    blocks: data?.block?.data,
    fetchBlocksError,
    fetchMoreBlocks,
    isBlocksFetching,
    timestamp: data?.block?.timestamp
  };
};

export { getLatestBlocksQuery };
