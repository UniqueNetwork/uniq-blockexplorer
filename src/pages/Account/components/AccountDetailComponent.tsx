import React, { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import { account as gqlAccount } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import LoadingComponent from '../../../components/LoadingComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { shortcutText } from '../../../utils/textUtils';
import { useApi } from '../../../hooks/useApi';

interface AccountProps {
  accountId: string
}

const AccountDetailComponent: FC<AccountProps> = ({ accountId }) => {
  const { account, isAccountFetching } = gqlAccount.useGraphQlAccount(accountId);

  const deviceSize = useDeviceSize();

  const { chainData } = useApi();

  if (isAccountFetching) return <LoadingComponent />;

  const {
    available_balance: availableBalance,
    free_balance: freeBalance,
    locked_balance: lockedBalance,
    timestamp
  } = account || {};

  return (
    <AccountContainer>
      <div>
        <Avatar
          size='large'
          value={accountId}
        />
      </div>
      <div>
        <Text size={'l'}>Account name</Text>
        <h2>
          {deviceSize === DeviceSize.sm || deviceSize === DeviceSize.md
            ? shortcutText(accountId)
            : accountId}
        </h2>
      </div>
      <Text
        color={'grey-500'}
      >
          Created on
      </Text>
      <Text>
        {timestamp ? new Date(timestamp).toLocaleString() : 'unavailable'}
      </Text>
      <Text color={'grey-500'}>
          Balance
      </Text>
      <BalanceContainer>
        <Text>{`${freeBalance || 'unavailable'} ${
          chainData?.properties.tokenSymbol || ''
        } (total) `}</Text>
        <Text color={'grey-500'}>{`${lockedBalance || 'unavailable'} ${
          chainData?.properties.tokenSymbol || ''
        } (locked) `}</Text>
        <Text color={'grey-500'}>{`${availableBalance || 'unavailable'} ${
          chainData?.properties.tokenSymbol || ''
        } (transferable)`}</Text>
      </BalanceContainer>
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
  display: grid;
  grid-column-gap: var(--gap);
  grid-template-columns: 85px 1fr;
  grid-row-gap: var(--gap);
  padding-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);
  div:nth-child(3) {
    margin-top: calc(var(--gap) / 2);
  }
  div:nth-child(4) {
    margin-top: calc(var(--gap) / 2);
  }
  
  @media (max-width: 767px) {
    grid-row-gap: 0;
    div:not(:first-child) {
      grid-column: span 11;
      margin-top: var(--gap);
    }

    div:nth-child(3) {
      margin-top: calc(var(--gap) * 1.5);
    }

    div:not(:first-child) {
      grid-column: span 11;
    }

    div:last-child {
      flex-direction: column;
      align-items: flex-start;

      span:not(:first-child) {
        margin-top: calc(var(--gap) / 4);
      }
    }
  }
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--gap);
  align-items: center;
`;

export default AccountDetailComponent;
