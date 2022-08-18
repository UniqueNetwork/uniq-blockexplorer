import { GQLOrderByParamsArgs } from '../types';

export type TokenTransaction = {
  block_index: string;
  collection_id: number;
  collection_name?: string;
  image: object;
  owner: string;
  owner_normalized: string;
  timestamp: number | null;
  from_owner: string;
  from_owner_normalized: string;
  to_owner: string;
  to_owner_normalized: string;
  token_id: number;
  token_name?: string;
  token_prefix?: string;
};

export interface TokenTransactionWithTimeDif extends TokenTransaction {
  time_difference: string;
}

export type TokenTransactionsOrderByParams = {
  block_index: GQLOrderByParamsArgs;
  timestamp: GQLOrderByParamsArgs;
};

export type TokenTransactionsVariables = {
  limit: number;
  offset: number;
  order_by?: { [name: string]: 'asc' | 'desc' };
  where?: { [key: string]: unknown };
};

export type TokenTransactionsDataResponse = {
  count: number;
  data: TokenTransaction[];
  timestamp: number;
};

export type TokenTransactionsData = {
  tokenTransactions: TokenTransactionsDataResponse;
};
