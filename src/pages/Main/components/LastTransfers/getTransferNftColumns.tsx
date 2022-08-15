import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';

import Picture from '../../../../components/Picture';

export const getTransferNftColumns = (chainId?: string) => [
  {
    dataIndex: 'token_id',
    key: 'token_id',
    render: (value: string, row: any) => (
      <Link
        className="token-transfer-cell"
        to={`/${chainId ? chainId + '/' : ''}tokens/${value}`}
      >
        <LinkInner>
          <Picture alt={value.toString()} src={row.image} />
          {row.token_prefix} #{value}
        </LinkInner>
      </Link>
    ),
    title: 'NFT',
    width: 100,
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
    width: 100,
  },
  {
    dataIndex: 'collection_name',
    key: 'collection_name',
    render: (value: string) => (
      <Text size="m" weight="light">
        {value}
      </Text>
    ),
    title: 'Collection',
    width: 100,
  },
  {
    dataIndex: 'block_index',
    key: 'block_index',
    render: (value: string) => (
      <Text size="m" weight="light">
        {value}
      </Text>
    ),
    title: 'Extrinsic ID',
    width: 100,
  },
  {
    dataIndex: 'from_owner_normalized',
    key: 'from_owner_normalized',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'From',
    width: 100,
  },
  {
    dataIndex: 'to_owner_normalized',
    key: 'to_owner_normalized',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'To',
    width: 100,
  },
];

const LinkInner = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) / 2);
  align-items: center;

  svg {
    height: 40px;
    width: 40px;
  }
`;
