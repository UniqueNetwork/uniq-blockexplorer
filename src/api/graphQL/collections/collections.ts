import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { CollectionsData, CollectionsVariables, FetchMoreCollectionsOptions, useGraphQlCollectionsProps } from './types';

const collectionsQuery = gql`
  query getCollections($limit: Int, $offset: Int, $where: view_collections_bool_exp = {}, $orderBy: [view_collections_order_by!] = {}) {
    view_collections(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      collection_cover
      collection_id
      description
      name
      offchain_schema
      owner
      token_limit
      token_prefix
    }
    view_collections_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const useGraphQlCollections = ({ filter, orderBy, pageSize }: useGraphQlCollectionsProps) => {
  const getWhere = useCallback(
    (filter?: Record<string, unknown>, searchString?: string) => ({
      _and: {
        ...(filter ? { _or: filter } : {}),
        ...(searchString
          ? {
            _or: [
              { name: { _iregex: searchString } },
              { description: { _iregex: searchString } },
              { token_prefix: { _ilike: searchString } }
            ]
          }
          : {})
      }
    }),
    []
  );

  const {
    data,
    error: fetchCollectionsError,
    fetchMore,
    loading: isCollectionsFetching,
    refetch
  } = useQuery<CollectionsData, CollectionsVariables>(collectionsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset: 0,
      orderBy: orderBy,
      where: getWhere(filter)
    }
  });

  const fetchMoreCollections = useCallback(
    ({ limit = pageSize, offset, searchString, orderBy, filter }: FetchMoreCollectionsOptions) => {
      return fetchMore({
        variables: {
          limit,
          offset,
          orderBy,
          where: getWhere(filter, searchString)
        }
      });
    },
    [fetchMore, getWhere, pageSize]
  );

  const fetchOrderedCollections = useCallback(
    ({ orderBy }: FetchMoreCollectionsOptions) => {
      return refetch({
        orderBy
      });
    },
    [refetch]
  );

  return {
    collections: data?.view_collections || [],
    collectionsCount: data?.view_collections_aggregate.aggregate.count || 0,
    fetchCollectionsError,
    fetchMoreCollections,
    fetchOrderedCollections,
    isCollectionsFetching
  };
};

export const useGraphQlCollection = (collectionId: string) => {
  const {
    data,
    error: fetchCollectionsError,
    loading: isCollectionFetching
  } = useQuery<CollectionsData, CollectionsVariables>(collectionsQuery, {
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
    collection: data?.view_collections[0] || undefined,
    fetchCollectionsError,
    isCollectionFetching
  };
};

export { collectionsQuery };
