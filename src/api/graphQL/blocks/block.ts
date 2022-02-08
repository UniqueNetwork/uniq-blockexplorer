import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { LastBlocksData, LastBlocksVariables, FetchMoreBlocksOptions, useGraphQlBlocksProps } from './types';

const getLatestBlocksQuery = gql`
  query GetLatestBlocks(
    $limit: Int
    $offset: Int
    $order_by: [view_last_block_order_by]
    $where: view_last_block_bool_exp
  ) {
    view_last_block(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
      block_number
      event_count
      extrinsic_count
      timestamp
    }
    view_last_block_aggregate(where: $where) {
      aggregate {
        count
      }
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
                  block_number: { _eq: searchString }
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
    blockCount: data?.view_last_block_aggregate.aggregate.count || 0,
    blocks: data?.view_last_block,
    fetchBlocksError,
    fetchMoreBlocks,
    isBlocksFetching
  };
};

export { getLatestBlocksQuery };
