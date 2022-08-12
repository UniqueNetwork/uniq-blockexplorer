import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';

import { TransfersData, TransfersVariables, useGraphQlLastTransfersProps } from './types';
// { timestamp: desc }
// { amount: desc }

const getLastTransfersQuery = gql`
  query getLastTransfers(
    $limit: Int
    $offset: Int
    $orderBy: ExtrinsicOrderByParams = {}
    $where: ExtrinsicWhereParams = {}
  ) {
    extrinsics(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      data {
        block_number
        block_index
        amount
        fee
        from_owner
        from_owner_normalized
        hash
        success
        timestamp
        to_owner
        to_owner_normalized
      }
      count
      timestamp
    }
  }
`;

export const useGraphQlLastTransfers = ({
  accountId,
  pageSize,
  searchString,
}: useGraphQlLastTransfersProps) => {
  const getWhere = useCallback(
    (searchString?: string) => ({
      _and: {
        amount: { _neq: 0 },
        method: {
          _in: ['transfer', 'transferAll', 'transferKeepAlive', 'vestedTransfer'],
        },
        ...(accountId
          ? {
              _or: [
                { from_owner: { _eq: accountId } },
                { from_owner_normalized: { _eq: accountId } },
                { to_owner: { _eq: accountId } },
                { to_owner_normalized: { _eq: accountId } },
              ],
            }
          : {}),
        ...(searchString
          ? {
              _or: {
                block_index: { _eq: searchString },
                from_owner: { _eq: searchString },
                from_owner_normalized: { _eq: searchString },
                to_owner: { _eq: searchString },
                to_owner_normalized: { _eq: searchString },
              },
            }
          : {}),
      },
    }),
    [accountId],
  );

  const {
    data,
    error: fetchTransfersError,
    loading: isTransfersFetching,
  } = useQuery<TransfersData, TransfersVariables>(getLastTransfersQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset: 0,
      where: getWhere(searchString),
    },
  });

  return {
    fetchTransfersError,
    isTransfersFetching,
    timestamp: data?.extrinsics?.timestamp,
    transfers: data?.extrinsics?.data,
    transfersCount: data?.extrinsics?.count || 0,
  };
};

export { getLastTransfersQuery };
