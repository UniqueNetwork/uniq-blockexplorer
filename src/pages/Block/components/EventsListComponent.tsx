import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';

import { EventsForBlockVariables, EventsForBlockData, eventsForBlock } from '../../../api/graphQL/';
import { timeDifference } from '../../../utils/timestampUtils';
import PaginationComponent from '../../../components/Pagination';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import Table from '../../../components/Table';

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

const pageSize = 10;

const EventListComponent = (props: { blockNumber: string | undefined }) => {
  const { blockNumber } = props;
  const deviceSize = useDeviceSize();

  const [currentPage, setCurrentPage] = useState<number>(1);

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
    (page: number) => {
      setCurrentPage(page);
      const offset = (page - 1) * pageSize;

      void fetchMoreExtrinsics({
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
        data={eventsList?.event}
        loading={loading}
        rowKey={'event_index'}
      />
      <PaginationComponent
        count={eventsList?.event_aggregate?.aggregate?.count || 0}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default EventListComponent;
