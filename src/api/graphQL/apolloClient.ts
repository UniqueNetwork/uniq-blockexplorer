import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// since we are not using infinity load - we want to wipe all the previouse results and get only the new one
const dontCache = () => {
  return {
    // Don't client separate results based on
    // any of this field's arguments.
    keyArgs: false,
    merge(existing = [], incoming: any[]) {
      // aggregations bypass
      if (!incoming?.length) return incoming
      return [...incoming]
    },
  }
}

export const getApolloClient = (clientEndpoint: string) =>
  new ApolloClient({
    link: new HttpLink({ uri: clientEndpoint }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            view_last_block: dontCache,
            view_last_block_aggregate: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return incoming
              },
            },
            view_last_transfers: dontCache,
            collections: dontCache,
            view_extrinsic: dontCache,
            view_extrinsic_aggregate: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return incoming
              },
            },
          },
        },
      },
    }),
  })