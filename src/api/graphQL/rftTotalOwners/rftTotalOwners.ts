import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

import {
  TokensTotalOwnersData,
  TokensTotalOwnersVariables,
  useGraphQLTokensTotalOwnersProps,
} from './types';

const tokensTotalOwnersQuery = gql`
  query getTokensOwners($limit: Int, $offset: Int, $where: TokenOwnersWhereParams = {}) {
    token_owners(where: $where, limit: $limit, offset: $offset) {
      data {
        collection_id
        token_id
      }
    }
  }
`;

export const useGraphQLTokensTotalOwners = ({
  limit = 2_147_483_647,
  offset = 0,
  tokens,
}: useGraphQLTokensTotalOwnersProps) => {
  const where = useMemo(() => {
    let where: { [key: string]: unknown } = {};

    if (tokens?.length) {
      const collectionMap = new Map();
      tokens.forEach((token) => {
        const tokensInCollectionMap = collectionMap.get(token.collection_id);

        if (!!tokensInCollectionMap) {
          collectionMap.set(token.collection_id, [
            ...tokensInCollectionMap,
            token.token_id,
          ]);
        } else {
          collectionMap.set(token.collection_id, [token.token_id]);
        }
      });

      const tokensFilter: { [key: string]: unknown }[] = [];
      collectionMap.forEach((tokens, collectionId) => {
        tokensFilter.push({
          collection_id: { _eq: collectionId },
          token_id: { _in: tokens },
        });
      });
      where = {
        _or: tokensFilter,
        amount: { _neq: 0 },
      };
    }

    return where;
  }, [tokens]);

  const {
    data,
    error: fetchTokensTotalOwnersError,
    loading: isTokensTotalOwnersFetching,
  } = useQuery<TokensTotalOwnersData, TokensTotalOwnersVariables>(
    tokensTotalOwnersQuery,
    {
      fetchPolicy: 'network-only',
      // Used for first execution
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        limit,
        offset,
        where,
      },
    },
  );

  const tokensOwners = useMemo(() => {
    return (
      data?.token_owners?.data?.reduce<Record<string, number>>(
        (acc, { token_id, collection_id }) => {
          if (acc[`${collection_id}_${token_id}`]) {
            acc[`${collection_id}_${token_id}`]++;
          } else {
            acc[`${collection_id}_${token_id}`] = 1;
          }

          return acc;
        },
        {},
      ) || {}
    );
  }, [data?.token_owners?.data]);

  return {
    fetchTokensTotalOwnersError,
    isTokensTotalOwnersFetching,
    tokensOwners,
  };
};
