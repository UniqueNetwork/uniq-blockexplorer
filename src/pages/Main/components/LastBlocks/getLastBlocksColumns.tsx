import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

export const getLastBlocksColumns = (chainId: string) => [
  {
    dataIndex: 'block_number',
    key: 'block_number',
    render: (value: string) => <Link to={`/${chainId}/block/${value}`}>{value}</Link>,
    title: 'Block',
    width: 100,
  },
  // Age is calculated from timestamp after query execution
  {
    dataIndex: 'time_difference',
    key: 'time_difference',
    render: (value: number) => (
      <Text size="m" weight="light">
        {value}
      </Text>
    ),
    title: 'Age',
    width: 130,
  },
  {
    dataIndex: 'block_with_index',
    key: 'block_with_index',
    render: (value: string) => (
      <Link
        to={`/${chainId ? chainId.toLowerCase() + '/' : ''}extrinsic/${
          value.split('-')?.[0]
        }`}
      >
        {value.split('-')?.[1]}
      </Link>
    ),
    title: 'Extrinsic',
    width: 80,
  },
  {
    dataIndex: 'total_events',
    key: 'total_events',
    render: (value: string) => (
      <Text size="m" weight="light">
        {value}
      </Text>
    ),
    title: 'Event',
    width: 80,
  },
];
