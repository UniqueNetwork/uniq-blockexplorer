import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';

import {
  CollectionsData,
  CollectionsVariables,
  useGraphQlCollectionsProps,
} from './types';

const collectionsQuery = gql`
  query getCollections(
    $limit: Int
    $offset: Int
    $where: CollectionWhereParams = {}
    $orderBy: CollectionOrderByParams = {}
  ) {
    collections(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      data {
        attributes_schema
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
        transfers_count
        type
      }
      count
      timestamp
    }
  }
`;

export const useGraphQlCollections = ({
  filter,
  offset = 0,
  orderBy,
  pageSize,
  searchString,
}: useGraphQlCollectionsProps) => {
  const getWhere = useCallback(
    (_filter?: Record<string, unknown>, searchString?: string) => ({
      _and: [
        { ...(_filter || {}) },
        {
          ...(searchString
            ? {
                _or: [
                  { name: { _ilike: `%${searchString}%` } },
                  { description: { _ilike: `%${searchString}%` } },
                  { owner: { _eq: searchString } },
                  { owner_normalized: { _eq: searchString } },
                  { token_prefix: { _ilike: `%${searchString}%` } },
                  ...(Number(searchString)
                    ? [{ collection_id: { _eq: Number(searchString) } }]
                    : []),
                ],
              }
            : {}),
        },
      ],
    }),
    [],
  );

  const {
    data,
    error: fetchCollectionsError,
    loading: isCollectionsFetching,
  } = useQuery<CollectionsData, CollectionsVariables>(collectionsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset,
      orderBy,
      where: getWhere(filter, searchString?.trim().toLowerCase()),
    },
  });

  return {
    collections: data?.collections?.data || [],
    collectionsCount: data?.collections?.count || 0,
    fetchCollectionsError,
    isCollectionsFetching,
    timestamp: data?.collections?.timestamp || 0,
  };
};

export const useGraphQlCollection = (collectionId: number) => {
  const {
    data,
    error: fetchCollectionsError,
    loading: isCollectionFetching,
  } = useQuery<CollectionsData, CollectionsVariables>(collectionsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 1,
      offset: 0,
      where: { collection_id: { _eq: collectionId } },
    },
  });

  return {
    collection: data?.collections.data[0] || undefined,
    fetchCollectionsError,
    isCollectionFetching,
    collectionsCount: data?.collections.count,
  };
};

export { collectionsQuery };
