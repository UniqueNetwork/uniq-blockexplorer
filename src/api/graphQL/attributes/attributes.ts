import { gql, useQuery } from '@apollo/client';

import {
  CollectionAttributesData,
  CollectionAttributesVariables,
  useGraphQLCollectionAttributesProps,
} from './types';

const collectionAttributesQuery = gql`
  query getAttributes($where: AttributesWhereParams!, $orderBy: AttributesOrderByParams) {
    attributes(where: $where, order_by: $orderBy) {
      count
      data {
        key
        name
        values {
          raw_value
          tokens_count
          value
        }
      }
    }
  }
`;

export const useGraphQLCollectionAttributes = ({
  collectionId,
  orderBy,
}: useGraphQLCollectionAttributesProps) => {
  const where = { collection_id: { _eq: collectionId } };

  const {
    data,
    error: fetchCollectionAttributesError,
    loading: isCollectionAttributesFetching,
  } = useQuery<CollectionAttributesData, CollectionAttributesVariables>(
    collectionAttributesQuery,
    {
      fetchPolicy: 'network-only',
      // Used for first execution
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        where,
        orderBy,
      },
    },
  );

  return {
    fetchCollectionAttributesError,
    isCollectionAttributesFetching,
    count: data?.attributes?.count || 0,
    collectionAttributes: data?.attributes?.data,
  };
};
