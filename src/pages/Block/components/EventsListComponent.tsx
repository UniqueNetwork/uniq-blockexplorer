import React, { useCallback } from 'react'
import Table from 'rc-table'
import { useQuery } from '@apollo/client'

import LoadingComponent from '../../../components/LoadingComponent'
import { EventsForBlockVariables, EventsForBlockData, eventsForBlock } from '../../../api/graphQL/'
import { timeDifference } from '../../../utils/timestampUtils'
import PaginationComponent from '../../../components/Pagination'
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize'

const blockColumns = [
  {
    title: 'Action',
    dataIndex: 'method',
    key: 'method',
    width: 100,
    render: (value: string) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>Action</div>
        <div className={'block__table-value'}>{value}</div>
      </div>
    ),
  },
  {
    title: 'ID',
    dataIndex: 'event_index',
    key: 'event_index',
    width: 100,
    render: (value: string) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>ID</div>
        <div className={'block__table-value'}>Unavailable</div>
      </div>
    ),
  },
  {
    title: 'Age',
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: 100,
    render: (value: number) => (
      <div className={'block__table-box'}>
        <div className={'block__table-title'}>Age</div>
        <div className={'block__table-value'}>{value ? timeDifference(value) : '---'}</div>
      </div>
    ),
  },
]

const EventListComponent = (props: any) => {
  const deviceSize = useDeviceSize()
  const { blockNumber } = props
  const pageSize = 10

  const {
    loading,
    error,
    fetchMore: fetchMoreExtrinsics,
    data: eventsList,
  } = useQuery<EventsForBlockData, EventsForBlockVariables>(eventsForBlock.getEventsQuery, {
    variables: {
      limit: pageSize,
      offset: 0,
      order_by: { block_number: 'desc' },
      where: { block_number: { _eq: blockNumber } },
    },
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  })

  const onPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreExtrinsics({
        variables: {
          limit,
          offset,
        },
      }),
    [fetchMoreExtrinsics]
  )

  return (
    <>
      <Table
        columns={blockColumns}
        data={eventsList?.event}
        emptyText={() => (!loading ? 'No data' : <LoadingComponent />)}
        rowKey={'event_index'}
      />
      <PaginationComponent
        pageSize={pageSize}
        count={eventsList?.event_aggregate?.aggregate?.count || 0}
        onPageChange={onPageChange}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  )
}

export default EventListComponent
