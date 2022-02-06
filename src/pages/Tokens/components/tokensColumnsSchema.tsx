import React from 'react';

import { Token, TokenSorting } from '../../../api/graphQL';
import TableSortableColumnTitle from '../../../components/TableSortableColumnTitle';
import CollectionTableCell from '../../../components/CollectionTableCell';
import TokenTableCell from '../../../components/TokenTableCell';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import config from '../../../config';

const { IPFSGateway } = config;

export const getTokensColumns = (chainId: string, orderBy: TokenSorting, onOrderChange: (orderBy: TokenSorting) => void) => [
  {
    dataIndex: 'token_id',
    key: 'token_id',
    render: (value: string, item: unknown) => <TokenTableCell
      chainId={chainId}
      collectionId={(item as Token).collection_id}
      imageUrl={(item as Token).image_path}
      tokenId={value}
      tokenPrefix={(item as Token).token_prefix}
    />,
    title: <TableSortableColumnTitle
      dataIndex={'token_id'}
      onOrderChange={onOrderChange}
      orderBy={orderBy}
      title={'Item'}
    />,
    width: 100
  },
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: string, item: unknown) => <CollectionTableCell
      chainId={chainId}
      collectionId={value}
      collectionName={(item as Token).collection_name}
      coverImageUrl={(item as Token).collection_cover ? `${IPFSGateway || ''}/${(item as Token).collection_cover}` : undefined}
    />,
    title: <TableSortableColumnTitle
      dataIndex={'collection_id'}
      onOrderChange={onOrderChange}
      orderBy={orderBy}
      title={'Collection'}
    />,
    width: 100
  },
  {
    dataIndex: 'date_of_creation',
    key: 'date_of_creation',
    title: <TableSortableColumnTitle
      dataIndex={'date_of_creation'}
      onOrderChange={onOrderChange}
      orderBy={orderBy}
      title={'Date'}
    />,
    width: 100
  },
  {
    dataIndex: 'owner',
    key: 'owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'Owner',
    width: 100
  }
];
