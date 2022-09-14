export interface AccountVariables {
  accountId: string;
}

export interface AccountDTM {
  account_id: string;
  account_id_normalized: string;
  available_balance: string;
  block_height: number;
  free_balance: string;
  locked_balance: string;
  timestamp: number;
  nonce: string;
}

export interface AccountData {
  accounts: {
    data: AccountDTM[];
    count: number;
  };
}
