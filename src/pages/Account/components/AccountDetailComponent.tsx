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
  className?: string
}

const AccountDetailComponent: FC<AccountProps> = ({ accountId, className }) => {
  const { account, isAccountFetching } = gqlAccount.useGraphQlAccount(accountId);

  const deviceSize = useDeviceSize();

  const { chainData } = useApi();

  if (isAccountFetching) return <LoadingComponent />;

  const { available_balance: availableBalance,
    free_balance: freeBalance,
    locked_balance: lockedBalance,
    timestamp } = account || {};

  return (
    <div className={className}>
      <div className={'account-container'}>
        <div className={'avatar-container'}>
          <Avatar
            size='large'
            value={accountId}
          />
        </div>
        <div className={'name-container'}>
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
        <div className={'balance-container'}>
          <Text>{`${freeBalance || 'unavailable'} ${
            chainData?.properties.tokenSymbol || ''
          } (total) `}</Text>
          <Text color={'grey-500'}>{`${lockedBalance || 'unavailable'} ${
            chainData?.properties.tokenSymbol || ''
          } (locked) `}</Text>
          <Text color={'grey-500'}>{`${availableBalance || 'unavailable'} ${
            chainData?.properties.tokenSymbol || ''
          } (transferable)`}</Text>
        </div>
      </div>
    </div>
  );
};

export default styled(AccountDetailComponent)`
  padding-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed #D2D3D6;

  .account-container {
    display: grid;
    grid-column-gap: var(--gap);
    grid-template-columns: 85px 1fr;
    grid-row-gap: var(--gap);
    div:nth-child(3) {
      margin-top: calc(var(--gap) / 2);
    }
    div:nth-child(4) {
      margin-top: calc(var(--gap) / 2);
    }
    .balance-container {
      display: flex;
      flex-wrap: wrap;
      column-gap: var(--gap);
      align-items: center;
    }
  }
  
  @media (max-width: 767px) {
    .account-container {
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
  }
`;
