export interface BlockDetailVariables {
  block_number: string
}

export interface Block {
  timestamp: number
  total_events: number
  spec_version: number
  block_hash: string
  parent_hash: string
  extrinsics_root: string
  state_root: string
}

export interface BlockDetailData {
  block: Block[]
}
