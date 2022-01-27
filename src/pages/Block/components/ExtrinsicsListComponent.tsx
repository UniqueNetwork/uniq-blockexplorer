import { useQuery } from '@apollo/client';
import Table from 'rc-table';
import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import LoadingComponent from '../../../components/LoadingComponent';
import { ExtrinsicData, ExtrinsicVariables, extrinsic as gqlExtrinsic } from '../../../api/graphQL';
import { timeDifference } from '../../../utils/timestampUtils';
import PaginationComponent from '../../../components/Pagination';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';

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

const ExtrinsicsListComponent = (props: { blockNumber: string | undefined }) => {
  const deviceSize = useDeviceSize();
  const {
    blockNumber
  } = props;
  const pageSize = 10;

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
    (limit: number, offset: number) =>
      fetchMoreExtrinsics({
        variables: {
          limit,
          offset
        }
      }),
    [fetchMoreExtrinsics]
  );

  const loadingOrEmpty = useMemo(() => !loading ? 'No data' : <LoadingComponent />, [loading]);

  return (
    <>
      <Table
        columns={blockColumns}
        data={eventsList?.view_extrinsic}
        emptyText={loadingOrEmpty}
        rowKey={'block_index'}
      />
      <PaginationComponent
        count={eventsList?.view_extrinsic_aggregate?.aggregate?.count || 0}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default ExtrinsicsListComponent;
