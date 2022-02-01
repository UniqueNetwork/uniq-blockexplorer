import React, { useCallback, useMemo } from 'react';
import Table from 'rc-table';
import { useQuery } from '@apollo/client';

import LoadingComponent from '../../../components/LoadingComponent';
import { EventsForBlockVariables, EventsForBlockData, eventsForBlock } from '../../../api/graphQL/';
import { timeDifference } from '../../../utils/timestampUtils';
import PaginationComponent from '../../../components/Pagination';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';

const blockColumns = [
  {
    dataIndex: 'method',
    key: 'method',
    render: (value: string) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>Action</div>
        <div className={'block__table-value'}>{value}</div>
      </div>
    ),
    title: 'Action',
    width: 100
  },
  {
    dataIndex: 'event_index',
    key: 'event_index',
    render: () => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>ID</div>
        <div className={'block__table-value'}>Unavailable</div>
      </div>
    ),
    title: 'ID',
    width: 100
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
    width: 100
  }
];

const EventListComponent = (props: { blockNumber: string | undefined }) => {
  const deviceSize = useDeviceSize();
  const { blockNumber } = props;
  const pageSize = 10;

  const {
    data: eventsList,
    fetchMore: fetchMoreExtrinsics,
    loading
  } = useQuery<EventsForBlockData, EventsForBlockVariables>(eventsForBlock.getEventsQuery, {
    fetchPolicy: 'network-only',
    // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: pageSize,
      offset: 0,
      order_by: { block_number: 'desc' },
      where: { block_number: { _eq: blockNumber } }
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
        data={eventsList?.event}
        emptyText={loadingOrEmpty}
        rowKey={'event_index'}
      />
      <PaginationComponent
        count={eventsList?.event_aggregate?.aggregate?.count || 0}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default EventListComponent;
