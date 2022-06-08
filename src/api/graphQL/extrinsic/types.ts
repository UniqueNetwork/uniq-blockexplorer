export interface ExtrinsicVariables {
  block_index: string
  limit: number
  offset: number
}

export interface Extrinsic {
  amount: number
  args: string
  block_index: string
  block_number: number
  fee: number
  hash: string
  method: string
  section: string
  signer: string
  success: boolean
  timestamp: number
  from_owner: string
  from_owner_normalized: string
  to_owner: string
  to_owner_normalized: string
}

export interface ExtrinsicData {
  extrinsics: {
    data: Extrinsic[];
    count: number;
  }
}
