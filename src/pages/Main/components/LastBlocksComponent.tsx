import React from 'react';
import Table from 'rc-table';
import { Text } from '@unique-nft/ui-kit';
import { LastBlock } from '../../../api/graphQL';
import PaginationComponent from '../../../components/Pagination';
import { timeDifference } from '../../../utils/timestampUtils';
import { BlockComponentProps } from '../types';
import LoadingComponent from '../../../components/LoadingComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { Link } from 'react-router-dom';

const blockColumns = [
  {
    dataIndex: 'block_number',
    key: 'block_number',
    render: (value: string) => <Link to={`/block/${value}`}>{value}</Link>,
    title: 'Block',
    width: 100
  },
  // Age is calculated from timestamp aftter query execution
  { dataIndex: 'time_difference', key: 'time_difference', title: 'Age', width: 100 },
  { dataIndex: 'extrinsic_count', key: 'extrinsic_count', title: 'Extrinsic', width: 100 },
  { dataIndex: 'event_count', key: 'event_count', title: 'Event', width: 100 }
];

const blocksWithTimeDifference = (
  blocks: LastBlock[] | undefined
): (LastBlock & { time_difference: string })[] => {
  if (!blocks) return [];

  return blocks.map((block: LastBlock) => ({
    ...block,
    time_difference: timeDifference(block.timestamp)
  }));
};

const LastBlocksComponent = ({ count,
  data,
  loading,
  onPageChange,
  pageSize }: BlockComponentProps<LastBlock[]>) => {
  const deviceSize = useDeviceSize();

  return (
    <div>
      {deviceSize !== DeviceSize.sm && (
        <Table
          columns={blockColumns}
          data={!loading && data?.length ? blocksWithTimeDifference(data) : []}
          emptyText={!loading ? 'No data' : <LoadingComponent />}
          rowKey={'block_number'}
        />
      )}
      {deviceSize === DeviceSize.sm && (
        <div className={'table-sm'}>
          {loading && <LoadingComponent />}
          {!loading && data?.length === 0 && <Text className={'text_grey'}>No data</Text>}
          {!loading &&
            blocksWithTimeDifference(data).map((item) => (
              <div
                className={'row'}
                key={item.block_number}
              >
                <div>
                  <Text color={'grey-500'}>Block</Text>
                  <Text>{item.block_number.toString()}</Text>
                </div>
                <div>
                  <Text color={'grey-500'}>Age</Text>
                  <Text>{item.time_difference}</Text>
                </div>
                <div>
                  <Text color={'grey-500'}>Extrinsic</Text>
                  <Text>{item.extrinsic_count?.toString() || '0'}</Text>
                </div>
                <div>
                  <Text color={'grey-500'}>Event</Text>
                  <Text>{item.event_count?.toString() || '0'}</Text>
                </div>
              </div>
            ))}
        </div>
      )}
      <PaginationComponent
        count={count || 0}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </div>
  );
};

export default LastBlocksComponent;
