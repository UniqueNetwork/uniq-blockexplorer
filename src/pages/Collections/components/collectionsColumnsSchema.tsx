import React from 'react';
import { Link } from 'react-router-dom';

import { timestampTableFormat } from '@app/utils';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

import { Collection, CollectionSorting } from '../../../api/graphQL';
import CollectionTableCell from '../../../components/CollectionTableCell';
import TableSortableColumnTitle from '../../../components/TableSortableColumnTitle';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';


export const getCollectionsColumns = (chainId: string, orderBy: CollectionSorting, onOrderChange: (orderBy: CollectionSorting) => void) => [
  {
    dataIndex: 'collection_id',
    key: 'collection_id',
    render: (value: string, item: unknown) => <CollectionTableCell
      chainId={chainId}
      collectionId={value}
      collectionName={(item as Collection).name}
      coverImageUrl={getCoverURLFromCollection((item as Collection).collection_cover)}
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
    render: timestampTableFormat,
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
  },
  {
    dataIndex: 'holders_count',
    key: 'holders_count',
    title: <TableSortableColumnTitle
      dataIndex={'holders_count'}
      onOrderChange={onOrderChange}
      orderBy={orderBy}
      title={'Holders'}
    />,
    width: 100
  },
  {
    dataIndex: 'tokens_count',
    key: 'tokens_count',
    render: (items: number, item: unknown) => {
      return <Link
        to={`/${chainId}/collections/${(item as Collection).collection_id}`}
      >{items || 0}</Link>;
    },
    title: <TableSortableColumnTitle
      dataIndex={'tokens_count'}
      onOrderChange={onOrderChange}
      orderBy={orderBy}
      title={'Items'}
    />,
    width: 100
  }
];
