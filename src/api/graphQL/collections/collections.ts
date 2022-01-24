import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { CollectionsData, CollectionsVariables, FetchMoreCollectionsOptions, useGraphQlCollectionsProps } from './types';

const collectionsQuery = gql`
  query getCollections($limit: Int, $offset: Int, $where: collections_bool_exp = {}) {
    collections(where: $where, limit: $limit, offset: $offset) {
      collection_id
      const_chain_schema
      description
      limits_accout_ownership
      limits_sponsore_data_rate
      limits_sponsore_data_size
      mode
      name
      offchain_schema
      owner
      owner_can_destroy
      owner_can_trasfer
      schema_version
      sponsorship_confirmed
      token_limit
      token_prefix
      tokens_aggregate {
        aggregate {
          count
        }
      }
      variable_on_chain_schema
      tokens {
        data
        id
        owner
        token_id
        collection {
          name
          token_prefix
        }
      }
    }
    collections_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const useGraphQlCollections = ({ filter, pageSize }: useGraphQlCollectionsProps) => {
  const getWhere = useCallback(
    (searchString?: string) => ({
      _and: {
        ...(filter ? { _or: filter } : {}),
        ...(searchString
          ? {
            _or: {
              description: { _ilike: searchString },
              name: { _ilike: searchString },
              token_prefix: { _ilike: searchString }
            }
          }
          : {})
      }
    }),
    [filter]
  );

  const { data,
    error: fetchCollectionsError,
    fetchMore,
    loading: isCollectionsFetching } = useQuery<CollectionsData, CollectionsVariables>(collectionsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset: 0,
      where: getWhere()
    }
  });

  const fetchMoreCollections = useCallback(
    ({ limit = pageSize, offset, searchString }: FetchMoreCollectionsOptions) => {
      return fetchMore({
        variables: {
          limit,
          offset,
          where: getWhere(searchString)
        }
      });
    },
    [fetchMore, getWhere, pageSize]
  );

  return {
    collections: data?.collections || [],
    collectionsCount: data?.collections_aggregate.aggregate.count || 0,
    fetchCollectionsError,
    fetchMoreCollections,
    isCollectionsFetching
  };
};

export const useGraphQlCollection = (collectionId: string) => {
  const { data,
    error: fetchCollectionsError,
    loading: isCollectionFetching } = useQuery<CollectionsData, CollectionsVariables>(collectionsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 1,
      offset: 0,
      where: { collection_id: { _eq: collectionId } }
    }
  });

  return {
    collection: data?.collections[0] || undefined,
    fetchCollectionsError,
    isCollectionFetching
  };
};

export { collectionsQuery };
