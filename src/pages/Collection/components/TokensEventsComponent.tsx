import React, { FC } from 'react';
import Table from '../../../components/Table';

interface TokensEventsComponentProps {
  events?: Event[]
  collectionId?: number
  tokenId?: number
  loading?: boolean
}

type Event = {
  id: string
  action: string
  age: string
  fee: string
  author: string
  result: string
}

const columns = [
  {
    dataIndex: 'token',
    key: 'token',
    title: 'Token',
    width: 100
  },
  {
    dataIndex: 'action',
    key: 'action',
    title: 'Action',
    width: 100
  },
  { dataIndex: 'age', key: 'age', title: 'Time', width: 100 },
  { dataIndex: 'fee', key: 'fee', title: 'Fee', width: 100 },
  { dataIndex: 'author', key: 'author', title: 'author', width: 100 },
  { dataIndex: 'result', key: 'result', title: 'Result', width: 100 }
];

const TokensEventsComponent: FC<TokensEventsComponentProps> = ({ events, loading }) => {
  return (
    <Table
      columns={columns}
      data={!loading ? events : []}
      loading={loading}
      rowKey={'collection_id'}
    />
  );
};

export default TokensEventsComponent;
