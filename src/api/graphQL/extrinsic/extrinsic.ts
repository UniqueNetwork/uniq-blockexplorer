import { gql, useQuery } from '@apollo/client';

import { ExtrinsicData, ExtrinsicVariables, ExtrinsicWhereParams } from './types';

const extrinsicQuery = gql`
  query getExtrinsic($limit: Int, $offset: Int, $where: ExtrinsicWhereParams) {
    extrinsics(limit: $limit, offset: $offset, where: $where) {
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

interface UseGraphQlExtrinsicProps {
  blockIndex?: string;
  limit: number;
  where: ExtrinsicWhereParams;
}

export const useGraphQlExtrinsic = ({ limit, where }: UseGraphQlExtrinsicProps) => {
  const { data, loading: isExtrinsicFetching } = useQuery<
    ExtrinsicData,
    ExtrinsicVariables
  >(extrinsicQuery, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: { limit, offset: 0, where },
  });

  return {
    count: data?.extrinsics.count,
    extrinsics: data?.extrinsics.data,
    isExtrinsicFetching,
    timestamp: data?.extrinsics.timestamp,
  };
};
