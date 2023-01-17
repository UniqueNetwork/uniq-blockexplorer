import { gql, useQuery } from '@apollo/client';

import { RftOwnersData, RftOwnersVariables, useGraphQLRftOwnersProps } from './types';

const tokenOwnersQuery = gql`
  query getTokenOwners(
    $limit: Int
    $offset: Int
    $where: TokenOwnersWhereParams = {}
    $orderBy: TokenOwnersOrderByParams = {}
  ) {
    token_owners(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      count
      timestamp
      data {
        id
        amount
        collection_id
        token_id
        owner_normalized
        owner
      }
    }
  }
`;

export const useGraphQLRftOwners = ({
  limit,
  offset = 0,
  orderBy,
  collectionId,
  tokenId,
}: useGraphQLRftOwnersProps) => {
  const where: { [key: string]: unknown } = {
    collection_id: { _eq: collectionId },
    token_id: { _eq: tokenId },
    amount: { _neq: 0 },
  };

  const {
    data,
    error: fetchTokenOwnersError,
    loading: isTokenOwnersFetching,
  } = useQuery<RftOwnersData, RftOwnersVariables>(tokenOwnersQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit,
      offset,
      orderBy,
      where,
    },
  });

  return {
    fetchTokenOwnersError,
    isTokenOwnersFetching,
    timestamp: data?.token_owners?.timestamp || 0,
    owners: data?.token_owners?.data,
    count: data?.token_owners?.count || 0,
  };
};
