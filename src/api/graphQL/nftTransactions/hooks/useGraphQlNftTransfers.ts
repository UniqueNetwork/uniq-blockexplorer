import { useCallback } from 'react';
import { ApolloError, useQuery } from '@apollo/client';

import {
  TokenTransaction,
  TokenTransactionsData,
  TokenTransactionsVariables,
} from '@app/api/graphQL/nftTransactions/types';

import { nftTransactionsQuery } from '../nftTransactions';

export interface UseGraphQlNftTransfersProps {
  pageSize: number;
  accountId?: string;
  orderBy?: { [name: string]: 'asc' | 'desc' };
  searchString?: string;
}

export interface UseGraphQlNftTransfersResult {
  fetchNftTransfersError?: ApolloError;
  isNftTransfersFetching: boolean;
  nftTransfers?: TokenTransaction[];
  nftTransfersCount: number;
  timestamp?: number;
}

export const useGraphQlNftTransfers = ({
  accountId,
  pageSize,
  orderBy,
  searchString,
}: UseGraphQlNftTransfersProps): UseGraphQlNftTransfersResult => {
  const getWhere = useCallback(
    (searchString?: string) => ({
      _and: {
        ...(accountId
          ? {
              _or: [
                { owner: { _eq: accountId } },
                { owner_normalized: { _eq: accountId } },
                { to_owner: { _eq: accountId } },
                { to_owner_normalized: { _eq: accountId } },
              ],
            }
          : {}),
        ...(searchString
          ? {
              _or: {
                block_index: { _eq: searchString },
                owner: { _eq: searchString },
                owner_normalized: { _eq: searchString },
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
    error: fetchNftTransfersError,
    loading: isNftTransfersFetching,
  } = useQuery<TokenTransactionsData, TokenTransactionsVariables>(nftTransactionsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset: 0,
      orderBy,
      where: getWhere(searchString),
    },
  });

  return {
    fetchNftTransfersError,
    isNftTransfersFetching,
    nftTransfers: data?.tokenTransactions?.data,
    nftTransfersCount: data?.tokenTransactions?.count || 0,
    timestamp: data?.tokenTransactions?.timestamp,
  };
};
