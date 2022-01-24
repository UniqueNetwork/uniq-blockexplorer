import { Token } from '../tokens/types';

export interface Collection {
  collection_id: number
  const_chain_schema: Record<string, unknown> | null
  description: string
  limits_accout_ownership: number | null
  limits_sponsore_data_rate: number | null
  limits_sponsore_data_size: number | null
  mode: string | null
  name: string
  owner: string
  owner_can_destroy: null
  owner_can_trasfer: null
  sponsorship_confirmed: null
  token_limit: number
  token_prefix: string
  offchain_schema: string
  schema_version: string
  variable_on_chain_schema: Record<string, unknown> | null
  tokens_aggregate: {
    aggregate: {
      count: number
    }
  }
  tokens: Token[]
  // additional properties needed
  date_of_creation?: string
  holders_count?: number
  type?: string
  actions_count?: number
  cover_image_url?: string

}

export interface CollectionsVariables {
  limit: number
  offset: number
  where?: Record<string, unknown>
}

export interface CollectionsData {
  collections: Collection[]
  collections_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export type useGraphQlCollectionsProps = {
  pageSize: number
  filter?: Record<string, unknown>
}

export type FetchMoreCollectionsOptions = {
  limit?: number
  offset?: number
  searchString?: string
}
