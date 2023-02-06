import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { formatLongNumber, timeDifference } from '@app/utils';
import { Token, TokenSorting } from '@app/api';

import TableSortableColumnTitle from '../../../../components/TableSortableColumnTitle';
import TokenTableCell from '../../../../components/TokenTableCell';

export const getTokensColumns = (
  chainId: string,
  orderBy: TokenSorting,
  onOrderChange: (orderBy: TokenSorting) => void,
  timestamp: number,
) => [
  {
    dataIndex: 'token_id',
    key: 'token_id',
    render: (value: number, item: unknown) => (
      <TokenTableCell
        chainId={chainId}
        collectionId={(item as Token).collection_id}
        imageUrl={(item as Token).image.fullUrl}
        tokenId={value}
        tokenPrefix={(item as Token).token_prefix}
      />
    ),
    title: (
      <TableSortableColumnTitle
        dataIndex="token_id"
        orderBy={orderBy}
        title="Item"
        onOrderChange={onOrderChange}
      />
    ),
    width: 180,
  },
  {
    dataIndex: 'date_of_creation',
    key: 'date_of_creation',
    render: (value: number) => {
      return (
        <Text size="m" weight="regular">
          {timeDifference(value, timestamp)}
        </Text>
      );
    },
    title: (
      <TableSortableColumnTitle
        dataIndex="date_of_creation"
        orderBy={orderBy}
        title="Created"
        onOrderChange={onOrderChange}
      />
    ),
    width: 150,
  },
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: number, item: unknown) => (
      <CollectionLink to={`/${chainId.toLowerCase()}/collections/${value}`}>
        <Text color="primary-500" weight="light">
          {(item as Token).collection_name} [ID {value}]
        </Text>
      </CollectionLink>
    ),
    title: (
      <TableSortableColumnTitle
        dataIndex="collection_id"
        orderBy={orderBy}
        title="Collection"
        onOrderChange={onOrderChange}
      />
    ),
    width: 180,
  },
  {
    dataIndex: 'total_pieces',
    key: 'total_pieces',
    render: (value: string) => <>{formatLongNumber(Number(value || 0))}</>,
    title: (
      <TableSortableColumnTitle
        dataIndex="total_pieces"
        orderBy={orderBy}
        title="Total fractions"
        onOrderChange={onOrderChange}
      />
    ),
    width: 100,
  },
  {
    dataIndex: 'transfers_count',
    key: 'transfers_count',
    render: (value: string) => <>{value}</>,
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
    dataIndex: 'ownersCount',
    key: 'owners',
    render: (value: string) => <>{value}</>,
    title: 'Owners',
    width: 100,
  },
];

const CollectionLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;
