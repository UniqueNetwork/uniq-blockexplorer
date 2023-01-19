import { gql, useQuery } from '@apollo/client';

import { RftHoldersData, RftHoldersVariables, useGraphQLRftHoldersProps } from './types';

const tokenHoldersQuery = gql`
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

export const useGraphQLRftHolders = ({
  limit,
  offset = 0,
  orderBy,
  collectionId,
  tokenId,
  owner,
}: useGraphQLRftHoldersProps) => {
  const where: { [key: string]: unknown } = {
    collection_id: { _eq: collectionId },
    token_id: { _eq: tokenId },
    amount: { _neq: 0 },
    owner: owner ? { _eq: owner } : undefined,
  };

  const {
    data,
    error: fetchTokenHoldersError,
    loading: isTokenHoldersFetching,
  } = useQuery<RftHoldersData, RftHoldersVariables>(tokenHoldersQuery, {
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
    fetchTokenHoldersError,
    isTokenHoldersFetching,
    timestamp: data?.token_owners?.timestamp || 0,
    owners: data?.token_owners?.data,
    count: data?.token_owners?.count || 0,
  };
};
