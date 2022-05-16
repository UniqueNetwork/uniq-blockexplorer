import BN from 'bn.js';

export type SchemaVersionTypes = 'Custom' | 'ImageURL' | 'TokenURI' | 'Unique';

export interface NftCollectionProperties {
  coverImageURL: string;
}

export interface NFTCollection {
  id: number
  access?: 'Normal' | 'WhiteList'
  decimalPoints: BN | number
  description: number[]
  tokenPrefix: string
  coverImageUrl: string
  mintMode?: boolean
  mode: {
    nft: null
    fungible: null
    reFungible: null
    invalid: null
  }
  name: number[]
  offchainSchema: string
  owner?: string
  schemaVersion: SchemaVersionTypes
  sponsorship: {
    confirmed?: string
    disabled?: string | null
    unconfirmed?: string | null
  }
  limits?: {
    accountTokenOwnershipLimit: string
    sponsoredDataSize: string
    sponsoredDataRateLimit: string
    sponsoredMintSize: string
    tokenLimit: string
    sponsorTimeout: string
    ownerCanTransfer: boolean
    ownerCanDestroy: boolean
  }
  constOnChainSchema: string
  properties: NftCollectionProperties;
}

export type AttributesDecoded = {
  [key: string]: string | string[]
}

export interface NFTToken {
  id: number
  owner?: { Substrate: string }
  constData?: string
  attributes: AttributesDecoded
  imageUrl: string
}

export type MetadataType = {
  metadata?: string
}
