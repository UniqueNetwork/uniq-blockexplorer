import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { CollectionsData, CollectionsVariables, FetchMoreCollectionsOptions, useGraphQlCollectionsProps } from './types';

const collectionsQuery = gql`
  query getCollections($limit: Int, $offset: Int, $where: CollectionWhereParams = {}, $orderBy: CollectionOrderByParams = {}) {
    collections(
      where: $where
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) {
      data {
        actions_count
      collection_cover
      collection_id
      const_chain_schema
      date_of_creation
      description
      holders_count
      limits_account_ownership
      limits_sponsore_data_rate
      limits_sponsore_data_size
      mint_mode
      name
      offchain_schema
      owner
      owner_normalized
      owner_can_destroy
      owner_can_transfer
      schema_version
      sponsorship
      token_limit
      token_prefix
      tokens_count
      type
      }
      count
    }
  }
`;

export const useGraphQlCollections = ({ filter, orderBy, pageSize }: useGraphQlCollectionsProps) => {
  const client = useApolloClient();

  const getWhere = useCallback(
    (_filter?: Record<string, unknown>, searchString?: string) => ({
      _and: {
        ...(_filter || {}),
        ...(searchString
          ? {
            _or: [
              { name: { _ilike: searchString } },
              { description: { _ilike: searchString } },
              { owner: { _eq: searchString } },
              { owner_normalized: { _eq: searchString } },
              { token_prefix: { _ilike: searchString } },
              ...(Number(searchString) ? [{ collection_id: { _eq: Number(searchString) } }] : [])
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
      orderBy,
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

  useEffect(() => {
    fetchMore({})
      .catch((errMsg) => {
        throw new Error(errMsg);
      });
  }, [client.link, fetchMore]);

  return {
    collections: data?.collections?.data || [],
    collectionsCount: data?.collections?.count || 0,
    fetchCollectionsError,
    fetchMoreCollections,
    fetchOrderedCollections,
    isCollectionsFetching
  };
};

export const useGraphQlCollection = (collectionId: number) => {
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
    collection: data?.collections.data[0] || undefined,
    fetchCollectionsError,
    isCollectionFetching
  };
};

export { collectionsQuery };
