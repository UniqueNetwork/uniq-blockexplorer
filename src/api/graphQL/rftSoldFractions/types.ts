export interface TokensSoldFractionsVariables {
  limit: number;
  offset: number;

  where?: { [key: string]: unknown };
}

export interface TokensSoldFractionsData {
  token_owners: {
    data: TokenSoldFractions[];
    count: number;
    timestamp: number;
  };
}

export interface TokenSoldFractions {
  collection_id: number;
  token_id: number;
  amount: number;
}

export interface useGraphQLTokensSoldFractionsProps {
  tokenId: number;
  collectionId: number;
  owner: string;
}
