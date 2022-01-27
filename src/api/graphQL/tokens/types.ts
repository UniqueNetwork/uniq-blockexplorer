export interface TokensVariables {
  limit: number
  offset: number
  where?: Record<string, unknown>
}

export interface Token {
  token_id: number
  collection_id: number
  collection_name: string
  data: {
    hex: string
  }
  token_prefix: string
  owner: string
  image_path: string
}

export interface TokensData {
  view_tokens: Token[]
  view_tokens_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export type useGraphQlTokensProps = {
  pageSize: number
  filter?: Record<string, unknown>
}

export type FetchMoreTokensOptions = {
  limit?: number
  offset?: number
  searchString?: string
}
