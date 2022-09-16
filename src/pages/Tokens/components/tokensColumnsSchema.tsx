import React from 'react';

import { timestampTableFormat } from '@app/utils';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

import { Token, TokenSorting } from '../../../api/graphQL';
import TableSortableColumnTitle from '../../../components/TableSortableColumnTitle';
import CollectionTableCell from '../../../components/CollectionTableCell';
import TokenTableCell from '../../../components/TokenTableCell';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

export const getTokensColumns = (
  chainId: string,
  orderBy: TokenSorting,
  onOrderChange: (orderBy: TokenSorting) => void,
) => [
  {
    dataIndex: 'token_id',
    key: 'token_id',
    render: (value: string, item: unknown) => (
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
    width: 100,
  },
  {
    dataIndex: 'date_of_creation',
    key: 'date_of_creation',
    render: timestampTableFormat,
    title: (
      <TableSortableColumnTitle
        dataIndex="date_of_creation"
        orderBy={orderBy}
        title="Created"
        onOrderChange={onOrderChange}
      />
    ),
    width: 100,
  },
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: string, item: unknown) => (
      <CollectionTableCell
        chainId={chainId}
        collectionId={value}
        collectionName={(item as Token).collection_name}
        coverImageUrl={getCoverURLFromCollection((item as Token).collection_cover)}
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
    width: 100,
  },
];
