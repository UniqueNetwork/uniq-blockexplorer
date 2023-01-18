export interface RftOwnersVariables {
  limit: number;
  offset: number;
  orderBy?: OwnersSorting;
  where?: { [key: string]: unknown };
}

export interface RftOwnersData {
  token_owners: {
    data: RftOwners[];
    count: number;
    timestamp: number;
  };
}

export interface RftOwners {
  collection_id: number;
  token_id: number;
  amount: number;
  owner: string;
  owner_normalized: string;
}

export type OwnersSorting = {
  [P in keyof RftOwners]?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
};

export interface useGraphQLRftOwnersProps {
  limit: number;
  offset?: number;
  orderBy?: OwnersSorting;
  tokenId?: number;
  collectionId?: number;
  owner?: string;
}
