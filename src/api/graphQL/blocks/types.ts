export interface LastBlock {
  timestamp: number
  block_number: number
  total_events: number
  total_extrinsics: number
}

export interface LastBlocksVariables {
  limit: number
  offset: number
  order_by?: { [name: string]: 'asc' | 'desc' }
  where?: { [key: string]: unknown }
}

export interface LastBlocksData {
  block: {
    data: LastBlock[];
    count: number;
    timestamp: number;
  }
}

export type useGraphQlBlocksProps = {
  pageSize: number
}

export type FetchMoreBlocksOptions = {
  limit?: number
  offset?: number
  searchString?: string
}
