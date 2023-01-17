export interface TokensTotalOwnersVariables {
  limit: number;
  offset: number;

  where?: { [key: string]: unknown };
}

export interface TokensTotalOwnersData {
  token_owners: {
    data: TokenTotalOwner[];
    count: number;
    timestamp: number;
  };
}

export interface TokenTotalOwner {
  collection_id: number;
  token_id: number;
  amount: number;
}

export interface TokenTotalOwners {
  collection_id: number;
  token_id: number;
  owners: number;
}

export type TokenKeys = { token_id: number; collection_id: number };

export interface useGraphQLTokensTotalOwnersProps {
  limit?: number;
  offset?: number;
  tokens: TokenKeys[];
}
