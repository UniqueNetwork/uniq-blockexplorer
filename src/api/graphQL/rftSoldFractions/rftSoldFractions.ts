import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

import {
  TokensSoldFractionsData,
  TokensSoldFractionsVariables,
  useGraphQLTokensSoldFractionsProps,
} from './types';

const tokensTotalOwnersQuery = gql`
  query getTokensOwners($where: TokenOwnersWhereParams = {}) {
    token_owners(where: $where) {
      data {
        amount
      }
    }
  }
`;

export const useGraphQLTokensSoldFractions = ({
  collectionId,
  tokenId,
  owner,
}: useGraphQLTokensSoldFractionsProps) => {
  const {
    data,
    error: fetchTokensTotalOwnersError,
    loading: isTokensTotalOwnersFetching,
  } = useQuery<TokensSoldFractionsData, TokensSoldFractionsVariables>(
    tokensTotalOwnersQuery,
    {
      fetchPolicy: 'network-only',
      // Used for first execution
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit: 1,
        where: {
          collection_id: { _eq: collectionId },
          token_id: { _eq: tokenId },
          amount: { _neq: 0 },
          owner: { _neq: owner },
        },
      },
    },
  );

  const soldFractions = useMemo(() => {
    return (
      data?.token_owners?.data?.reduce<number>((acc, { amount }) => {
        return acc + amount;
      }, 0) || 0
    );
  }, [data?.token_owners?.data]);

  return {
    fetchTokensTotalOwnersError,
    isTokensTotalOwnersFetching,
    soldFractions,
  };
};
