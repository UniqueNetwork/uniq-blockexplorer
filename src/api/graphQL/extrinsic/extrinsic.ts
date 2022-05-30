import { gql, useQuery } from '@apollo/client';
import { ExtrinsicData, ExtrinsicVariables } from './types';

const extrinsicQuery = gql`
  query getExtrinsic($limit: Int, $offset: Int, $block_index: String!) {
    view_extrinsic(
      limit: $limit
      offset: $offset
      where: { block_index: { _eq: $block_index } }
    ) {
      amount
      block_index
      block_number
      fee
      hash
      success
      timestamp
      from_owner
      from_owner_normalized
      to_owner
      to_owner_normalized
      method
      section
      success
    }
    view_extrinsic_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export { extrinsicQuery };

export const useGraphQlExtrinsic = (blockIndex?: string) => {
  const { data, loading: isExtrinsicFetching } = useQuery<ExtrinsicData, ExtrinsicVariables>(
    extrinsicQuery,
    {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      variables: { block_index: blockIndex || '', limit: 1, offset: 0 }
    }
  );

  return { extrinsic: data?.view_extrinsic[0], isExtrinsicFetching };
};
