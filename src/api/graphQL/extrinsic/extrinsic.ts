import { gql, useQuery } from '@apollo/client';

import { ExtrinsicData, ExtrinsicVariables } from './types';

const extrinsicQuery = gql`
  query getExtrinsic($limit: Int, $offset: Int, $block_index: String!) {
    extrinsics(
      limit: $limit
      offset: $offset
      where: { block_index: { _eq: $block_index } }
    ) {
      data {
        amount
        block_index
        block_number
        fee
        from_owner
        from_owner_normalized
        hash
        method
        section
        success
        timestamp
        to_owner
        to_owner_normalized
      }
      count
      timestamp
    }
  }
`;

export { extrinsicQuery };

export const useGraphQlExtrinsic = (blockIndex?: string, limit = 1) => {
  const { data, loading: isExtrinsicFetching } = useQuery<
    ExtrinsicData,
    ExtrinsicVariables
  >(extrinsicQuery, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: { block_index: blockIndex || '', limit, offset: 0 },
  });

  return {
    count: data?.extrinsics.count,
    extrinsics: data?.extrinsics.data,
    isExtrinsicFetching,
    timestamp: data?.extrinsics.timestamp,
  };
};
