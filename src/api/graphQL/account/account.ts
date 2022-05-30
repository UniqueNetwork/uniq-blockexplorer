import { gql, useQuery } from '@apollo/client';
import { AccountData, AccountVariables } from './types';

const accountQuery = gql`
  query getAccount($accountId: String!) {
    account(where: {
        _or: [
          { account_id: { _eq: $accountId } }
          { account_id_normalized: { _eq: $accountId }}
        ]
      }) {
      account_id
      account_id_normalized
      available_balance
      balances
      block_height
      free_balance
      locked_balance
      nonce
      timestamp,
    }
  }
`;

export const useGraphQlAccount = (accountId: string) => {
  const { data: account, loading: isAccountFetching } = useQuery<AccountData, AccountVariables>(
    accountQuery,
    {
      notifyOnNetworkStatusChange: true,
      variables: { accountId }
    }
  );

  return { account: account?.account?.[0], isAccountFetching };
};

export { accountQuery };
