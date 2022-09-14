import { GQLOrderByParamsArgs, GQLWhereOpsInt, GQLWhereOpsString } from '../types';

export type StatisticsMap = {
  blocks?: number;
  collections?: number;
  events?: number;
  extrinsics?: number;
  tokens?: number;
  transfers?: number;
};

export type Statistics = {
  count: number;
  name: string;
};

export interface StatisticsVariables {
  limit: number;
  offset: number;
  where?: StatisticsWhereParams;
  orderBy?: StatisticsOrderByParams;
}

export type StatisticsOrderByParams = {
  count: GQLOrderByParamsArgs;
  name: GQLOrderByParamsArgs;
};

export type StatisticsWhereParams = {
  _and?: StatisticsWhereParams[];
  _or?: StatisticsWhereParams[];
  count?: GQLWhereOpsInt;
  name?: GQLWhereOpsString;
};

export type StatisticsDataResponse = {
  count: number;
  data: Statistics[];
  timestamp: number;
};

export type StatisticsData = {
  statistics: StatisticsDataResponse;
};
