import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// since we are not using infinity load - we want to wipe all the previouse results and get only the new one
// TODO: something strange going on here. If you copy-paste result of this function as value for fields - it's fine. But getting this value as result of function (which is the same) - TS error
const dontCache = (): any => {
  return {
    // Don't client separate results based on
    // any of this field's arguments.
    keyArgs: false,
    merge(_: unknown, incoming: unknown[]): unknown[] {
      // aggregations bypass
      if (!incoming?.length) return incoming;

      return [...incoming];
    }
  };
};

export const getApolloClient = (clientEndpoint: string) =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            block: dontCache(),
            collections: dontCache(),
            extrinsics: dontCache(),
            holders: dontCache(),
            tokens: dontCache(),
            transfers: dontCache()
          }
        }
      }
    }),
    link: new HttpLink({ uri: clientEndpoint })
  });
