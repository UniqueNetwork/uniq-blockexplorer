import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';
import { formatLongNumber } from '@app/utils';

export const getTransferColumns = (tokenSymbol: string, chainId?: string) => [
  {
    dataIndex: 'block_index',
    key: 'block_index',
    render: (value: string) => (
      <Link to={`/${chainId ? chainId.toLowerCase() + '/' : ''}extrinsic/${value}`}>
        {value}
      </Link>
    ),
    title: 'Extrinsic ID',
    width: 120,
  },
  {
    dataIndex: 'time_difference',
    key: 'age',
    render: (value: number) => (
      <Text size="m" weight="light">
        {value}
      </Text>
    ),
    title: 'Age',
    width: 150,
  },
  {
    dataIndex: 'from_owner',
    key: 'from_owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'From',
    width: 180,
  },
  {
    dataIndex: 'to_owner',
    key: 'to_owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'To',
    width: 180,
  },
  /* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */
  {
    dataIndex: 'amount',
    key: 'amount',
    render: (value: number) => (
      <Text size="m" weight="light">{`${
        formatLongNumber(value) || 0
      } ${tokenSymbol}`}</Text>
    ),
    title: 'Amount',
    width: 150,
  },
];
