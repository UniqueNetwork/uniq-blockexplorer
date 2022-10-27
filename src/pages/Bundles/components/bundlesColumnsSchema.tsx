import React from 'react';
import { DefaultRecordType } from 'rc-table/lib/interface';

import { timestampTableFormat } from '@app/utils';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

import { Token, TokenSorting } from '../../../api/graphQL';
import TableSortableColumnTitle from '../../../components/TableSortableColumnTitle';
import CollectionTableCell from '../../../components/CollectionTableCell';
import TokenTableCell from '../../../components/TokenTableCell';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

export const getBundlesColumns = (
  chainId: string,
  orderBy: TokenSorting,
  onOrderChange: (orderBy: TokenSorting) => void,
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
        dataIndex="token_prefix"
        orderBy={orderBy}
        title="Bundle"
        onOrderChange={onOrderChange}
      />
    ),
    width: 180,
  },
  {
    dataIndex: 'date_of_creation',
    key: 'date_of_creation',
    render: timestampTableFormat,
    title: (
      <TableSortableColumnTitle
        dataIndex="date_of_creation"
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
    render: (value: string, item: unknown) => (
      <CollectionTableCell
        chainId={chainId}
        collectionId={(item as Token).collection_id}
        collectionName={value}
        coverImageUrl={getCoverURLFromCollection((item as Token).collection_cover)}
      />
    ),
    title: (
      <TableSortableColumnTitle
        dataIndex="collection_name"
        orderBy={orderBy}
        title="Collection"
        onOrderChange={onOrderChange}
      />
    ),
    width: 160,
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
