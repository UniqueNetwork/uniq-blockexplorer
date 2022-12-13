import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { Text, useNotifications } from '@unique-nft/ui-kit';
import { Address } from '@unique-nft/utils';

import { account as gqlAccount } from '@app/api/graphQL';
import {
  CoverContainer,
  IconWithTooltip,
  IdentityIcon,
  LoadingComponent,
  Select,
  SVGIcon,
} from '@app/components';
import { useDeviceSize, DeviceSize, useApi, deviceWidth } from '@app/hooks';
import { formatFeeValue, shortcutText } from '@app/utils';
import { Header3 } from '@app/styles/styled-components';
import { TChainNetwork } from '@app/api/ApiContext';

type ChainsFormat =
  | 'Unique'
  | 'Quartz'
  | 'Sapphire'
  | 'Opal (Substrate SS58 address format)'
  | 'Ethereum mirror';
type TFormatOption = { title: ChainsFormat };

const OPTIONS_FOR_ETHER_ADDRESS: TFormatOption[] = [
  { title: 'Unique' },
  { title: 'Quartz' },
  { title: 'Sapphire' },
  { title: 'Opal (Substrate SS58 address format)' },
];

const OPTIONS_FOR_SUBSTRATE_ADDRESS: TFormatOption[] = [
  ...OPTIONS_FOR_ETHER_ADDRESS,
  { title: 'Ethereum mirror' },
];

const getFormatFromChain = (chain: TChainNetwork): string => {
  switch (chain) {
    case 'OPAL':
      return 'Opal (Substrate SS58 address format)';
    case 'QUARTZ':
      return 'Quartz';
    default:
      return 'Unique';
  }
};

interface AccountProps {
  accountId: string;
  substrateAddress: string;
}

const AccountDetailComponent: FC<AccountProps> = ({ accountId, substrateAddress }) => {
  const { account, isAccountFetching } = gqlAccount.useGraphQlAccount(substrateAddress);
  const { currentChain } = useApi();
  const deviceSize = useDeviceSize();
  const { info } = useNotifications();
  const isEthereumAccount = /0x[0-9A-Fa-f]{40}/g.test(accountId as string);
  const [accountFormat, setAccountFormat] = useState(
    isEthereumAccount ? 'Ethereum mirror' : getFormatFromChain(currentChain.network),
  );
  const [accountFormatted, setAccountFormatted] = useState(accountId);

  const changeAccountFormat = useCallback(
    (option) => {
      setAccountFormat(option.title);
      switch (option.title) {
        case 'Unique':
          setAccountFormatted(Address.normalize.substrateAddress(substrateAddress, 7391));
          break;
        case 'Quartz':
          setAccountFormatted(Address.normalize.substrateAddress(substrateAddress, 255));
          break;
        case 'Sapphire':
          setAccountFormatted(Address.normalize.substrateAddress(substrateAddress, 8883));
          break;
        case 'Opal (Substrate SS58 address format)':
          setAccountFormatted(Address.normalize.substrateAddress(substrateAddress));
          break;
        case 'Ethereum mirror':
          setAccountFormatted(Address.mirror.substrateToEthereum(substrateAddress));
          break;
      }
    },
    [substrateAddress],
  );

  if (isAccountFetching) return <LoadingComponent />;

  const {
    account_id: accountChain,
    account_id_normalized: accountNormalized,
    available_balance: availableBalance = 'unavailable',
    free_balance: freeBalance = 'unavailable',
    locked_balance: lockedBalance = 'unavailable',
  } = account || {};

  const tokenSymbol = currentChain?.symbol || '';
  const accountAddress = accountChain || accountNormalized || accountId;

  const onCopyAddress = (account: string) => {
    navigator.clipboard.writeText(account).then(() => {
      info('Address copied');
    });
  };

  return (
    <AccountWrapper>
      <CoverContainer>
        <IdentityIcon copyable address={accountAddress} size="72" />
      </CoverContainer>
      <AccountInfoWrapper>
        <AccountLabel>
          <Text size="m" color={'grey-500'}>
            Account format
          </Text>
          <IconWithTooltip>
            <span>
              You could check how your address looks in the <br /> different networks
            </span>
          </IconWithTooltip>
          <SelectStyled
            options={
              isEthereumAccount
                ? OPTIONS_FOR_ETHER_ADDRESS
                : OPTIONS_FOR_SUBSTRATE_ADDRESS
            }
            optionKey="title"
            optionValue="title"
            value={accountFormat}
            onChange={changeAccountFormat}
          />
          {deviceSize > DeviceSize.sm && (
            <AccountFormat size="m" color={'grey-500'}>
              {isEthereumAccount ? 'Ethereum account' : 'Substrate account'}
            </AccountFormat>
          )}
        </AccountLabel>
        <AccountAddress>
          <h2>
            {deviceSize <= DeviceSize.lg
              ? shortcutText(accountFormatted)
              : accountFormatted}
          </h2>
          <div
            onClick={() => {
              onCopyAddress(accountFormatted);
            }}
          >
            <SVGIcon name={'copy'} width={24} height={24} />
          </div>
        </AccountAddress>
        {deviceSize <= DeviceSize.sm && (
          <AccountFormat size="m" color={'grey-500'}>
            {isEthereumAccount ? 'Ethereum account' : 'Substrate account'}
          </AccountFormat>
        )}
        <BalanceWrapper>
          <BalanceItem>
            <Text size={'m'}>{`Total balance (${tokenSymbol})`}</Text>
            <Header3>{formatFeeValue(Number(freeBalance))}</Header3>
          </BalanceItem>
          <BalanceItem>
            <Text color="grey-500">Locked</Text>
            <Header3>{formatFeeValue(Number(lockedBalance))}</Header3>
          </BalanceItem>
          <BalanceItem>
            <Text color="grey-500">Transferable</Text>
            <Header3>{formatFeeValue(Number(availableBalance))}</Header3>
          </BalanceItem>
        </BalanceWrapper>
      </AccountInfoWrapper>
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

  .unique-text[class*='weight-regular'] {
    font-weight: 400;
  }
  @media (${deviceWidth.smallerThan.md}) {
    grid-template-columns: 55px 1fr;
  }
`;

const AccountInfoWrapper = styled.div`
  position: relative;
`;

const AccountLabel = styled.div`
  display: flex;
  margin-top: var(--gap);
`;

const AccountAddress = styled.div`
  display: flex;
  h2 {
    margin-right: 10px;
  }
  svg {
    cursor: pointer;
  }
`;

const SelectStyled = styled(Select)`
  .select-wrapper {
    &.dropped {
      .select-value {
        border: none;
      }
    }
    .select-value {
      border: none;
      padding: 4px 16px 4px 8px;
      color: var(--primary-500);

      &:focus,
      &:hover {
        border: none;
      }
    }

    .icon-triangle {
      top: -8px;
      path {
        fill: var(--primary-500);
      }
    }

    .select-dropdown {
      width: 270px;
    }
  }
`;

const AccountFormat = styled(Text)`
  position: absolute;
  right: 0;
  @media (${deviceWidth.smallerThan.md}) {
    position: relative;
    margin-top: 10px;
    margin-left: -65px;
    &[class*='appearance-inline'] {
      display: block;
    }
  }
`;

const BalanceWrapper = styled.div`
  margin-top: calc(var(--gap) * 2);
  display: flex;
  gap: 24px;
  @media (${deviceWidth.smallerThan.md}) {
    flex-direction: column;
    margin-left: -66px;
  }
`;

const BalanceItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AccountDetailComponent;
