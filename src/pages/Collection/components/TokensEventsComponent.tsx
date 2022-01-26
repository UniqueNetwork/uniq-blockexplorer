import React, { FC } from 'react';
import { ColumnType } from 'rc-table/lib/interface';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import Table from 'rc-table';
import LoadingComponent from '../../../components/LoadingComponent';
import { Text } from '@unique-nft/ui-kit';

interface TokensEventsComponentProps {
  className?: string
  events?: Event[]
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

const columns: ColumnType<Event>[] = [
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

const TokensEventsComponent: FC<TokensEventsComponentProps> = ({ className, events, loading }) => {
  const deviceSize = useDeviceSize();

  return (
    <div className={className}>
      {deviceSize !== DeviceSize.sm && (
        <Table
          columns={columns}
          data={!loading ? events : []}
          emptyText={!loading ? 'No data' : <LoadingComponent />}
          rowKey={'collection_id'}
        />
      )}
      {deviceSize === DeviceSize.sm && (
        <div className={'table-sm'}>
          {loading && <LoadingComponent />}
          {!loading && events?.length === 0 && <Text className={'text_grey'}>No data</Text>}
          {!loading &&
            events?.map((item, index) => (
              <div
                className={'row'}
                key={item.id}
              >
                {columns.map((column) => (
                  <div key={`column-${column.key || ''}`}>
                    <Text color={'grey-500'}>{`${column?.title || ''}`}</Text>
                    {column.render && <>{column.render(item[column.dataIndex as keyof Event], item, index)}</>}
                    {!column.render && <Text>{item[column.dataIndex as keyof Event]?.toString() || ''}</Text>}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TokensEventsComponent;
