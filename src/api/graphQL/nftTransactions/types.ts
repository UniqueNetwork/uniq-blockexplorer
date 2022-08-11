import { GQLOrderByParamsArgs, GQLWhereOpsString } from '../types';

export type TokenTransaction = {
  block_index: string;
  collection_id: number;
  collection_name?: string;
  image: object;
  signer: string;
  signer_normalized: string;
  timestamp?: number;
  to_owner: string;
  to_owner_normalized: string;
  token_id: number;
  token_name?: string;
  token_prefix?: string;
}


export type TokenTransactionsOrderByParams = {
  block_index: GQLOrderByParamsArgs;
  timestamp: GQLOrderByParamsArgs;
}

export type  TokenTransactionWhereParams = {
  _and?: TokenTransactionWhereParams[];
  _or?: TokenTransactionWhereParams[];
  block_index?: GQLWhereOpsString;
}

export type TokenTransactionsVariables = {
  limit: number;
  offset: number;
  where?: TokenTransactionWhereParams;
  orderBy?: TokenTransactionsOrderByParams;
}

export type TokenTransactionsDataResponse = {
  count: number;
  data: TokenTransaction[];
  timestamp: number;
}

export type TokenTransactionsData = {
  transactions: TokenTransactionsDataResponse;
}