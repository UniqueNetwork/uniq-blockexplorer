import { useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { ExtrinsicData, ExtrinsicVariables, extrinsic as gqlExtrinsic } from '../../../api/graphQL';
import { timeDifference } from '../../../utils/timestampUtils';
import PaginationComponent from '../../../components/Pagination';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import Table from '../../../components/Table';

const blockColumns = [
  {
    dataIndex: 'method',
    key: 'method',
    render: (value: number) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>Action</div>
        <div className={'block__table-value'}>{value}</div>
      </div>
    ),
    title: 'Action',
    width: 100
  },
  {
    dataIndex: 'block_index',
    key: 'block_index',
    render: (value: number) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>ID</div>
        <div className={'block__table-value'}>
          <Link to={`/extrinsic/${value}`}>{value}</Link>
        </div>
      </div>
    ),
    title: 'ID',
    width: 150
  },
  {
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (value: number) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>Age</div>
        <div className={'block__table-value'}>{value ? timeDifference(value) : '---'}</div>
      </div>
    ),
    title: 'Age',
    width: 150
  },

  {
    dataIndex: 'hash',
    key: 'hash',
    render: (value: number) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>Hash</div>
        <div className={'block__table-value'}>
          <div className={'block__text-wrap'}>{value}</div>
        </div>
      </div>
    ),
    title: 'Hash',
    width: 100
  }
];

const pageSize = 10;

const ExtrinsicsListComponent = (props: { blockNumber: string | undefined }) => {
  const deviceSize = useDeviceSize();
  const { blockNumber } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: eventsList,
    fetchMore: fetchMoreExtrinsics,
    loading
  } = useQuery<ExtrinsicData, ExtrinsicVariables>(gqlExtrinsic.extrinsicQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      block_index: blockNumber || '',
      limit: pageSize,
      offset: 0
    }
  });

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const offset = (page - 1) * pageSize;

      fetchMoreExtrinsics({
        variables: {
          limit: pageSize,
          offset
        }
      });
    },
    [fetchMoreExtrinsics]
  );

  return (
    <>
      <Table
        columns={blockColumns}
        data={eventsList?.extrinsics.data}
        loading={loading}
        rowKey={'block_index'}
      />
      <PaginationComponent
        count={eventsList?.extrinsics?.count || 0}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default ExtrinsicsListComponent;
