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
  owner_can_trasfer: string
  owner_can_destroy: string
  schema_version: string
  actions_count: number
  // TODO: additional properties needed, but aren't in schema
  date_of_creation?: string
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
