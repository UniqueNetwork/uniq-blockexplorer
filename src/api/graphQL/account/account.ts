import { gql, useQuery } from '@apollo/client';

import { AccountData, AccountVariables } from './types';

const accountQuery = gql`
  query getAccount($accountId: String!) {
    accounts(
      where: {
        _or: [
          { account_id: { _eq: $accountId } }
          { account_id_normalized: { _eq: $accountId } }
        ]
      }
    ) {
      data {
        account_id
        account_id_normalized
        available_balance
        block_height
        free_balance
        locked_balance
        timestamp
      }
    }
  }
`;

export const useGraphQlAccount = (accountId: string) => {
  const { data, loading: isAccountFetching } = useQuery<AccountData, AccountVariables>(
    accountQuery,
    {
      notifyOnNetworkStatusChange: true,
      variables: { accountId },
    },
  );

  return { account: data?.accounts.data?.[0], isAccountFetching };
};

export { accountQuery };
