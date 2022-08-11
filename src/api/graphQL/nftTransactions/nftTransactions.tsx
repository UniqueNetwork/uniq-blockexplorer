import { gql } from '@apollo/client';

export const nftTransactionsQuery = gql`
  query getNftTransfers($limit: Int, $offset: Int,  $orderBy: TransactionsOrderByParams = {}, $where: TransactionWhereParams = {}) {
    tokenTransactions(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      data {
        block_index
        collection_id
        collection_name
        image
        signer
        signer_normalized
        timestamp
        to_owner
        to_owner_normalized
        token_id
        token_name
        token_prefix
      }
      count
      timestamp
    }
  }
`;
