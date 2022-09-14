export interface HoldersVariables {
  limit: number;
  offset: number;
  where?: Record<string, unknown>;
  orderBy?: Record<string, 'asc' | 'desc'>;
}

export interface Holder {
  collection_id: number;
  owner: string;
  owner_normalized: string;
  count: number;
}

export interface HoldersData {
  holders: {
    data: Holder[];
    count: number;
  };
}

export type HolderSorting = {
  [P in keyof Holder]?: 'asc' | 'desc';
};

export type useGraphQlHoldersProps = {
  pageSize: number;
  filter?: Record<string, unknown>;
  offset: number;
  orderBy?: HolderSorting;
  collectionId?: string;
};
