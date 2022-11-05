import { DefaultRecordType } from 'rc-table/lib/interface';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { timeDifference } from '@app/utils';

import { Token, TokenSorting } from '../../../api/graphQL';
import TableSortableColumnTitle from '../../../components/TableSortableColumnTitle';
import TokenTableCell from '../../../components/TokenTableCell';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

export const getBundlesColumns = (
  chainId: string,
  orderBy: TokenSorting,
  onOrderChange: (orderBy: TokenSorting) => void,
  timestamp: number,
) => [
  {
    dataIndex: 'token_prefix',
    key: 'token_prefix',
    render: (value: string, item: DefaultRecordType) => (
      <TokenTableCell
        chainId={chainId}
        collectionId={item.collection_id}
        imageUrl={item.image.fullUrl}
        tokenId={item.token_id}
        tokenPrefix={value}
      />
    ),
    title: (
      <TableSortableColumnTitle
        dataIndex="token_name"
        orderBy={orderBy}
        title="Bundle"
        onOrderChange={onOrderChange}
      />
    ),
    width: 180,
  },
  {
    dataIndex: 'bundle_created',
    key: 'bundle_created',
    render: (value: number) => {
      return (
        <Text size="m" weight="regular">
          {timeDifference(value, timestamp)}
        </Text>
      );
    },
    title: (
      <TableSortableColumnTitle
        dataIndex="bundle_created"
        orderBy={orderBy}
        title="Bundle created"
        onOrderChange={onOrderChange}
      />
    ),
    width: 150,
  },
  {
    dataIndex: 'collection_name',
    key: 'collection_name',
    render: (value: string, item: DefaultRecordType) => (
      <CollectionLink to={`/${chainId.toLowerCase()}/collections/${item.collection_id}`}>
        <Text color="primary-500" weight="light">
          {value} [ID {(item as Token).collection_id}]
        </Text>
      </CollectionLink>
    ),
    title: (
      <TableSortableColumnTitle
        dataIndex="collection_name"
        orderBy={orderBy}
        title="Collection"
        onOrderChange={onOrderChange}
      />
    ),
    width: 180,
  },
  {
    dataIndex: 'children_count',
    key: 'children_count',
    render: (value: string, item: unknown) => <>{value}</>,
    title: (
      <TableSortableColumnTitle
        dataIndex="children_count"
        orderBy={orderBy}
        title="Nested items"
        onOrderChange={onOrderChange}
      />
    ),
    width: 100,
  },
  {
    dataIndex: 'transfers_count',
    key: 'transfers_count',
    render: (value: string, item: unknown) => <>{value}</>,
    title: (
      <TableSortableColumnTitle
        dataIndex="transfers_count"
        orderBy={orderBy}
        title="Transfers"
        onOrderChange={onOrderChange}
      />
    ),
    width: 100,
  },
  {
    dataIndex: 'owner',
    key: 'owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'Owner',
    width: 150,
  },
];

const CollectionLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;
