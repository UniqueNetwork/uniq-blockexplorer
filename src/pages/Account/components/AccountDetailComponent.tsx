import React, { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import { account as gqlAccount } from '@app/api/graphQL';
import { Avatar, LoadingComponent } from '@app/components';
import { formatAmount, shortcutText } from '../../../utils/textUtils';
import { useApi, useDeviceSize, DeviceSize } from '@app/hooks';

interface AccountProps {
  accountId: string
}

const AccountDetailComponent: FC<AccountProps> = ({ accountId }) => {
  const { account, isAccountFetching } = gqlAccount.useGraphQlAccount(accountId);

  const deviceSize = useDeviceSize();

  const { chainData } = useApi();

  if (isAccountFetching) return <LoadingComponent />;

  const {
    available_balance: availableBalance = 'unavailable',
    free_balance: freeBalance = 'unavailable',
    locked_balance: lockedBalance = 'unavailable'
  } = account || {};

  const { tokenSymbol = '' } = chainData?.properties || {};

  return (
    <AccountWrapper>
      <div>
        <Avatar
          size='large'
          value={accountId}
        />
      </div>
      <div>
        <Text size={'l'}>Account name</Text>
        <h2>
          {deviceSize <= DeviceSize.md
            ? shortcutText(accountId)
            : accountId}
        </h2>
      </div>
      <Text color={'grey-500'}>
          Balance
      </Text>
      <BalanceWrapper>
        <Text>{`${formatAmount(freeBalance)} ${tokenSymbol} (total) `}</Text>
        <Text color={'grey-500'}>{`${formatAmount(lockedBalance)} ${tokenSymbol} (locked) `}</Text>
        <Text color={'grey-500'}>{`${formatAmount(availableBalance)} ${tokenSymbol} (transferable)`}</Text>
      </BalanceWrapper>
    </AccountWrapper>
  );
};

const AccountWrapper = styled.div`
  display: grid;
  grid-column-gap: var(--gap);
  grid-template-columns: 85px 1fr;
  grid-row-gap: calc(var(--gap) * 1.5);
  padding-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);

  
  @media (max-width: 767px) {
    grid-row-gap: 0;
    div:not(:first-child) {
      grid-column: span 2;
      margin-top: var(--gap);
    }

    *:nth-child(3) {
      margin-top: calc(var(--gap) * 1.5);
    }

    *:not(:first-child) {
      grid-column: span 2;
    }

    *:last-child {
      flex-direction: column;
      align-items: flex-start;

      span:not(:first-child) {
        margin-top: calc(var(--gap) / 4);
      }
    }
  }
`;

const BalanceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--gap);
  align-items: center;
`;

export default AccountDetailComponent;
