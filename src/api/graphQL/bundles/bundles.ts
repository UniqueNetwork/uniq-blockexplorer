import { gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';

import { BundlesData, BundlesVariables, useGraphQlBundlesProps } from './types';

const bundlesQuery = gql`
  query getCollections(
    $limit: Int
    $offset: Int
    $where: CollectionWhereParams = {}
    $orderBy: CollectionOrderByParams = {}
  ) {
    collections(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      data {
        attributes_schema
        collection_cover
        collection_id
        date_of_creation
        description
        holders_count
        nesting_enabled
        name
        offchain_schema
        owner
        owner_normalized
        # owner_can_destroy
        # owner_can_transfer
        schema_version
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

export const useGraphQlBundles = ({
  filter,
  offset = 0,
  orderBy,
  pageSize,
  searchString,
}: useGraphQlBundlesProps) => {
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
    error: fetchBundlesError,
    loading: isBundlesFetching,
  } = useQuery<BundlesData, BundlesVariables>(bundlesQuery, {
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
    bundles: data?.bundles?.data || [],
    bundlesCount: data?.bundles?.count || 0,
    fetchBundlesError,
    isBundlesFetching,
    timestamp: data?.bundles?.timestamp || 0,
  };
};

export const useGraphQlBundle = (collectionId: number) => {
  const {
    data,
    error: fetchBundlesError,
    loading: isBundlesFetching,
  } = useQuery<BundlesData, BundlesVariables>(bundlesQuery, {
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
    collection: data?.bundles.data[0] || undefined,
    fetchBundlesError,
    isBundlesFetching,
    collectionsCount: data?.bundles.count,
  };
};

export { bundlesQuery };
