import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { Heading, Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, useApi, useDeviceSize, useQueryParams } from '@app/hooks';
import {
  DEFAULT_PAGE_SIZE,
  defaultEventsOrderBy,
} from '@app/pages/Collections/constants';
import {
  CollectionsEvent,
  EventsSorting,
} from '@app/api/graphQL/collectionsEvents/types';
import { Pagination, ScrollableTable, SelectOptionProps, Stub } from '@app/components';
import { useGraphQLCollectionsEvents } from '@app/api/graphQL/collectionsEvents/collectionsEvents';

import { getCollectionEventsColumns } from './columnsSchema';

const EventsTable: FC<{
  header?: string;
  collectionId: number;
}> = ({ collectionId, header }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, setParamToQuery } = useQueryParams();
  const [queryParams, setQueryParams] = useSearchParams();
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  const [isAgeColumn, setIsAgeColumn] = useState(false);

  // get sort from query string
  const getOrderByFromQuery = () => {
    const split = sort?.split('-');
    // @ts-ignore
    return (split?.length || 0) > 1 ? { [split[0]]: split[1] } : defaultEventsOrderBy;
  };
  const [orderBy, setOrderBy] = useState<EventsSorting>(getOrderByFromQuery());

  useEffect(() => {
    setOrderBy(getOrderByFromQuery());
  }, [sort]);

  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: Number(queryParams.get('pageSize')) || DEFAULT_PAGE_SIZE,
    title: queryParams.get('pageSize') || DEFAULT_PAGE_SIZE.toString(),
  });
  const pageSizeNumber = pageSize.id as number;

  const offset = (currentPage - 1) * pageSizeNumber;

  const setOrderAndQuery = (sorting: EventsSorting) => {
    setOrderBy(sorting);
    setParamToQuery([
      {
        name: 'sort',
        // @ts-ignore
        value: `${Object.keys(sorting)[0]}-${sorting[Object.keys(sorting)[0]]}`,
      },
    ]);
  };

  const setPageSizeAndQuery = (option: SelectOptionProps) => {
    setPageSize(option);
    queryParams.set('pageSize', `${option.title}`);
    setQueryParams(queryParams);
  };

  const { collectionsEvents, isCollectionsEventsFetching, timestamp, count } =
    useGraphQLCollectionsEvents({
      collection_id: collectionId,
      offset,
      orderBy,
      limit: pageSizeNumber,
    });

  const columns = useMemo(() => {
    return getCollectionEventsColumns({
      orderBy,
      onOrderChange: setOrderAndQuery,
      timestamp,
      tokenSymbol: currentChain?.symbol,
      isAgeColumn,
      setIsAgeColumn,
      chainId: currentChain.network,
    });
  }, [orderBy, timestamp, currentChain?.symbol, isAgeColumn, setIsAgeColumn]);

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `${(item as CollectionsEvent).action}-${(item as CollectionsEvent).timestamp}`,
    [],
  );

  return (
    <Wrapper>
      {header && <Heading size={'2'}>{header}</Heading>}
      <div>
        {isCollectionsEventsFetching ? (
          <SkeletonWrapper>
            <Skeleton />
          </SkeletonWrapper>
        ) : count > 0 ? (
          <ScrollableTable
            columns={columns}
            data={collectionsEvents || []}
            loading={isCollectionsEventsFetching}
            rowKey={getRowKey}
            onRow={(event) => ({ className: !event.result ? 'failed-event' : '' })}
          />
        ) : (
          <Stub />
        )}
        {!!count && (
          <BottomPaginationContainer>
            <Pagination
              count={count || 0}
              currentPage={currentPage}
              itemName="Event"
              pageSize={pageSize}
              setPageSize={setPageSizeAndQuery}
              siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
              onPageChange={setCurrentPage}
            />
          </BottomPaginationContainer>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .failed-event {
    background: var(--coral-100);
    td:first-of-type span,
    td:first-of-type span svg path {
      color: var(--coral-700);
      fill: var(--coral-700);
    }
  }
`;

const SkeletonWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-grow: 1;

  .unique-skeleton {
    width: 100%;
    min-height: 120px;
    border-radius: var(--gap) !important;
  }
`;

const BottomPaginationContainer = styled.div`
  .pagination {
    display: flex;
    flex-direction: column;
    margin-top: calc(var(--gap) * 2.25);
    align-items: flex-end;
    gap: calc(var(--gap));
    > div:first-of-type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      > div:last-of-type {
        display: flex;
        align-items: center;
        gap: calc(var(--gap) / 2);
      }
    }
  }
`;

export default EventsTable;
