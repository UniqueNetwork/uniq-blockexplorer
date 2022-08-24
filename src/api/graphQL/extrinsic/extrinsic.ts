import { gql, useQuery } from '@apollo/client';

import { ExtrinsicData, ExtrinsicVariables } from './types';

const extrinsicQuery = gql`
  query getExtrinsic($limit: Int, $offset: Int, $block_index: String!) {
    extrinsics(
      limit: $limit
      offset: $offset
      where: { block_number: { _eq: $block_index } }
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

export const useGraphQlExtrinsic = (blockIndex?: string) => {
  const { data, loading: isExtrinsicFetching } = useQuery<
    ExtrinsicData,
    ExtrinsicVariables
  >(extrinsicQuery, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: { block_index: blockIndex || '', limit: 1, offset: 0 },
  });

  return {
    count: data?.extrinsics.count,
    extrinsic: data?.extrinsics.data[0],
    isExtrinsicFetching,
    timestamp: data?.extrinsics.timestamp,
  };
};
