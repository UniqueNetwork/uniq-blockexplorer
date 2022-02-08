import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LastBlock, lastBlocks } from '../../../api/graphQL';
import PaginationComponent from '../../../components/Pagination';
import { timeDifference } from '../../../utils/timestampUtils';
import { BlockComponentProps } from '../types';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import Table from '../../../components/Table';
import { useApi } from '../../../hooks/useApi';
import { Heading } from '@unique-nft/ui-kit';

const blockColumns = (chainId: string) => [
  {
    dataIndex: 'block_number',
    key: 'block_number',
    render: (value: string) => <Link to={`/${chainId}/block/${value}`}>{value}</Link>,
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

const LastBlocksComponent = ({
  pageSize = 5,
  searchString
}: BlockComponentProps) => {
  const deviceSize = useDeviceSize();

  const { currentChain } = useApi();

  const [currentPage, setCurrentPage] = useState(1);

  const { blockCount, blocks, fetchMoreBlocks, isBlocksFetching } = lastBlocks.useGraphQlBlocks({
    pageSize
  });

  useEffect(() => {
    const prettifiedBlockSearchString = searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;

    const offset = (currentPage - 1) * pageSize;

    void fetchMoreBlocks({
      limit: pageSize,
      offset,
      searchString: prettifiedBlockSearchString
    });
  }, [pageSize, searchString, currentPage, fetchMoreBlocks]);

  if (/[^$,.\d]/.test(searchString || '') || blockCount === 0) return null;

  return (
    <>
      <Heading size={'2'}>Latest blocks</Heading>
      <Table
        columns={blockColumns(currentChain.network)}
        data={blocksWithTimeDifference(blocks)}
        loading={isBlocksFetching}
        rowKey={'block_number'}
      />
      <PaginationComponent
        count={blockCount || 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default LastBlocksComponent;
