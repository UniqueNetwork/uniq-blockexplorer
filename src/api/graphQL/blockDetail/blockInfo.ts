import { gql } from '@apollo/client';

const getBlockQuery = gql`
  query getBlockDetails($block_number: Int!) {
    block(where: { block_number: { _eq: $block_number } }) {
      data {
        timestamp
        total_events
        spec_version
        block_hash
        parent_hash
        extrinsics_root
        state_root
      }
    }
  }
`;

export { getBlockQuery };
