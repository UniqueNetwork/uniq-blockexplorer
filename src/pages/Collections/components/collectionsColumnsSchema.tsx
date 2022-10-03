import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import { timeDifference } from '@app/utils';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

import { Collection, CollectionSorting } from '../../../api/graphQL';
import CollectionTableCell from '../../../components/CollectionTableCell';
import TableSortableColumnTitle from '../../../components/TableSortableColumnTitle';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

export const getCollectionsColumns = (
  chainId: string,
  orderBy: CollectionSorting,
  onOrderChange: (orderBy: CollectionSorting) => void,
  timestamp: number,
) => [
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: string, item: unknown) => (
      <CollectionTableCell
        chainId={chainId}
        collectionId={value}
        collectionName={(item as Collection).name}
        coverImageUrl={getCoverURLFromCollection((item as Collection).collection_cover)}
      />
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
    width: 120,
  },
  {
    dataIndex: 'owner',
    key: 'owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'Owner',
    width: 150,
  },
  {
    dataIndex: 'holders_count',
    key: 'holders_count',
    title: (
      <TableSortableColumnTitle
        dataIndex="holders_count"
        orderBy={orderBy}
        title="Holders"
        onOrderChange={onOrderChange}
      />
    ),
    width: 100,
  },
  {
    dataIndex: 'tokens_count',
    key: 'tokens_count',
    render: (items: number, item: unknown) => {
      return (
        <Link
          to={`/${chainId.toLowerCase()}/collections/${
            (item as Collection).collection_id
          }`}
        >
          {items || 0}
        </Link>
      );
    },
    title: (
      <TableSortableColumnTitle
        dataIndex={'tokens_count'}
        orderBy={orderBy}
        title={'Items'}
        onOrderChange={onOrderChange}
      />
    ),
    width: 100,
  },
  {
    dataIndex: 'transfers_count',
    key: 'transfers_count',
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
];
