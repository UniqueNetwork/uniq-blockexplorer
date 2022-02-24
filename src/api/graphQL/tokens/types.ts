export interface TokensVariables {
  limit: number
  offset: number
  where?: Record<string, unknown>
  orderBy?: Record<string, 'asc' | 'desc'>
}

export interface Token {
  token_id: number
  collection_id: number
  collection_name: string
  data: Record<string, string | string[]>
  date_of_creation: number
  token_prefix: string
  owner: string
  image_path: string
  collection_cover: string
  collection_description: string
}

export interface TokensData {
  view_tokens: Token[]
  view_tokens_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export type TokenSorting = {
  [P in keyof Token]?: 'asc' | 'desc'
}

export type useGraphQlTokensProps = {
  pageSize: number
  filter?: Record<string, unknown>
  orderBy?: TokenSorting,
  collectionId?: string
}

export type FetchMoreTokensOptions = {
  limit?: number
  offset?: number
  searchString?: string
  orderBy?: TokenSorting
  filter?: Record<string, unknown>
}
