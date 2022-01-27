import React from 'react';
import { Link } from 'react-router-dom';
import { LastBlock } from '../../../api/graphQL';
import PaginationComponent from '../../../components/Pagination';
import { timeDifference } from '../../../utils/timestampUtils';
import { BlockComponentProps } from '../types';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import Table from '../../../components/Table';

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
  if (!blocks || !Array.isArray(blocks)) return [];

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
      <Table
        columns={blockColumns}
        data={blocksWithTimeDifference(data)}
        loading={loading}
        rowKey={'block_number'}
      />
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
