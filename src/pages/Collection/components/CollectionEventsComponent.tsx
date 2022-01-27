import React, { FC } from 'react';
import Table from '../../../components/Table';

type Event = {
  id: string
  action: string
  age: string
  fee: string
  author: string
  result: string
}

interface CollectionEventsComponentProps {
  className?: string
  events?: Event[]
  loading?: boolean
}

const columns = [
  {
    dataIndex: 'action',
    key: 'action',
    title: 'Action',
    width: 100
  },
  { dataIndex: 'age', key: 'age', title: 'Age', width: 100 },
  { dataIndex: 'fee', key: 'fee', title: 'Fee', width: 100 },
  { dataIndex: 'author', key: 'author', title: 'author', width: 100 },
  { dataIndex: 'result', key: 'result', title: 'Result', width: 100 }
];

const CollectionEventsComponent: FC<CollectionEventsComponentProps> = ({
  className, events, loading
}) => {
  return (
    <div className={className}>
      <Table
        columns={columns}
        data={!loading ? events : []}
        loading={loading}
        rowKey={'collection_id'}
      />
    </div>
  );
};

export default CollectionEventsComponent;
