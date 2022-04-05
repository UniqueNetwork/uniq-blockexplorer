export interface ConstChainSchemaField {
  id: number,
  rule: 'required' | 'optional',
  type: string,
}

export interface ConstChainSchema {
  nested: {
    onChainMetaData: {
      nested: {
        NFTMeta: {
          fields: Record<string, ConstChainSchemaField>
        }
      }
    }
  }
}

export interface Collection {
  collection_cover: string
  collection_id: number
  description: string
  name: string
  offchain_schema: string
  owner: string
  token_limit: number
  token_prefix: string
  tokens_count: number
  holders_count: number
  type: string
  mint_mode: string
  owner_can_transfer: string
  owner_can_destroy: string
  schema_version: string
  actions_count: number
  limits_account_ownership: number
  limits_sponsore_data_rate: null
  limits_sponsore_data_size: null
  const_chain_schema: ConstChainSchema | null
  date_of_creation: number
}

export interface CollectionsVariables {
  limit: number
  offset: number
  where?: Record<string, unknown>
  orderBy?: Record<string, 'asc' | 'desc'>
}

export interface CollectionsData {
  view_collections: Collection[]
  view_collections_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export type CollectionSorting = {
  [P in keyof Collection]?: 'asc' | 'desc'
}

export type useGraphQlCollectionsProps = {
  pageSize: number
  orderBy?: CollectionSorting
  filter?: Record<string, unknown>
}

export type FetchMoreCollectionsOptions = {
  limit?: number
  offset?: number
  searchString?: string
  orderBy?: CollectionSorting
  filter?: Record<string, unknown>
}
