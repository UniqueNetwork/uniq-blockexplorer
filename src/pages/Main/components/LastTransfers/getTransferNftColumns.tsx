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
        to={`/${chainId ? chainId + '/' : ''}tokens/${row.collection_id}/${value}`}
      >
        <LinkInner>
          <Picture alt={value.toString()} src={row.image} />
          {row.token_prefix} #{value}
        </LinkInner>
      </Link>
    ),
    title: 'NFT',
    width: 160,
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
    dataIndex: 'collection_name',
    key: 'collection_name',
    render: (value: string) => (
      <CollectionWrapper>
        <Text size="m" weight="light">
          {value}
        </Text>
      </CollectionWrapper>
    ),
    title: 'Collection',
    width: 150,
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
    width: 150,
  },
  {
    dataIndex: 'owner_normalized',
    key: 'owner_normalized',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'From',
    width: 180,
  },
  {
    dataIndex: 'to_owner_normalized',
    key: 'to_owner_normalized',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'To',
    width: 180,
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

const CollectionWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
