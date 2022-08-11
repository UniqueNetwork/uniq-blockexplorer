import { useCallback } from "react";
import {ApolloError, useQuery} from "@apollo/client";
import { statisticsQuery } from "@app/api/graphQL/statistics/statistics";
import { TokenTransaction, TokenTransactionsData, TokenTransactionsOrderByParams, TokenTransactionsVariables } from "@app/api/graphQL/nftTransactions/types";

export interface UseGraphQlNftTransfersProps {
  pageSize: number;
  filter?: Record<string, unknown>;
  offset: number;
  orderBy?: TokenTransactionsOrderByParams;
}

export interface UseGraphQlNftTransfersResult {
  fetchNftTransfersError?: ApolloError;
  isNftTransfersFetching: boolean;
  nftTransfers?: TokenTransaction[];
  nftTransfersCount: number;
  timestamp?: number;
}

export const useGraphQlNftTransfers = ({ filter, offset, orderBy, pageSize }: UseGraphQlNftTransfersProps): UseGraphQlNftTransfersResult => {
  const getWhere = useCallback(
    (filter?: Record<string, unknown>) => (filter || {}),
    []
  );

  const {
    data,
    error: fetchNftTransfersError,
    loading: isNftTransfersFetching
  } = useQuery<TokenTransactionsData, TokenTransactionsVariables>(statisticsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset,
      orderBy,
      where: getWhere(filter)
    }
  });

  return {
    fetchNftTransfersError,
    isNftTransfersFetching,
    nftTransfers: data?.transactions?.data,
    nftTransfersCount: data?.transactions?.count || 0,
    timestamp: data?.transactions?.timestamp
  };
};