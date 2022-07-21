import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';

export const getTransferColumns = (tokenSymbol: string, chainId?: string) => [
  {
    dataIndex: 'block_index',
    key: 'block_index',
    render: (value: string) => <Link to={`/${chainId ? chainId + '/' : ''}extrinsic/${value}`}>{value}</Link>,
    title: 'Extrinsic',

    width: 100
  },
  { dataIndex: 'time_difference', key: 'age', title: 'Age', width: 100 },
  {
    dataIndex: 'from_owner',
    key: 'from_owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'From',
    width: 100
  },
  {
    dataIndex: 'to_owner',
    key: 'to_owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'To',
    width: 100
  },
  /* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */
  {
    dataIndex: 'amount',
    key: 'amount',
    render: (value: number) => (
      <Text size={'s'}>{`${(Number(value) && value) || 0} ${tokenSymbol}`}</Text>
    ),
    title: 'Amount',
    width: 100
  }
];
