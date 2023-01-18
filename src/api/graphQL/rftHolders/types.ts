export interface RftHoldersVariables {
  limit: number;
  offset: number;
  orderBy?: HoldersSorting;
  where?: { [key: string]: unknown };
}

export interface RftHoldersData {
  token_owners: {
    data: RftHolders[];
    count: number;
    timestamp: number;
  };
}

export interface RftHolders {
  collection_id: number;
  token_id: number;
  amount: number;
  owner: string;
  owner_normalized: string;
}

export type HoldersSorting = {
  [P in keyof RftHolders]?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
};

export interface useGraphQLRftHoldersProps {
  limit: number;
  offset?: number;
  orderBy?: HoldersSorting;
  tokenId?: number;
  collectionId?: number;
  owner?: string;
}
