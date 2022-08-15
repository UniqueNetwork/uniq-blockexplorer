import { useCallback } from 'react';
import { ApolloError, useQuery } from '@apollo/client';

import {
  StatisticsVariables,
  StatisticsData,
  StatisticsOrderByParams,
  Statistics,
} from '../types';
import { statisticsQuery } from '../statistics';

export interface UseGraphQlStatisticsProps {
  pageSize: number;
  filter?: Record<string, unknown>;
  offset: number;
  orderBy?: StatisticsOrderByParams;
}

export interface UseGraphQlStatisticsResult {
  fetchStatisticsError?: ApolloError;
  isStatisticsFetching: boolean;
  statistics?: Statistics[];
  statisticsCount: number;
  timestamp?: number;
}

export const useGraphQlStatistics = ({
  filter,
  offset,
  orderBy,
  pageSize,
}: UseGraphQlStatisticsProps): UseGraphQlStatisticsResult => {
  const getWhere = useCallback((filter?: Record<string, unknown>) => filter || {}, []);

  const {
    data,
    error: fetchStatisticsError,
    loading: isStatisticsFetching,
  } = useQuery<StatisticsData, StatisticsVariables>(statisticsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
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
    fetchStatisticsError,
    isStatisticsFetching,
    statistics: data?.statistics?.data,
    statisticsCount: data?.statistics?.count || 0,
    timestamp: data?.statistics?.timestamp,
  };
};
