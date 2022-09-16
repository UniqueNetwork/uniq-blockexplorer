import { gql } from '@apollo/client';

const getBlockQuery = gql`
  query getBlockDetails($blockNumber: Float!) {
    block(where: { block_number: { _eq: $blockNumber } }) {
      data {
        block_hash
        block_number
        extrinsics_root
        new_accounts
        num_transfers
        parent_hash
        spec_name
        spec_version
        state_root
        timestamp
        total_events
        total_extrinsics
      }
    }
  }
`;

export { getBlockQuery };
