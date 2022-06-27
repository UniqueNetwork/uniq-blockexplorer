export interface TransfersVariables {
  limit: number
  offset: number
  order_by?: { [name: string]: 'asc' | 'desc' }
  where?: { [key: string]: unknown }
}

export interface Transfer {
  block_number: number
  block_index: string
  amount: string
  fee: number
  from_owner: string
  from_owner_normalized: string
  hash: string
  success: boolean
  timestamp: number | null
  to_owner: string
  to_owner_normalized: string
}

export interface TransfersData {
  extrinsics: {
    data: Transfer[];
    count: number;
  }
}

export type useGraphQlLastTransfersProps = {
  pageSize: number
  accountId?: string
}
