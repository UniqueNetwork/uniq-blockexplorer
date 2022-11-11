import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { Heading, Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, useApi, useDeviceSize, useQueryParams } from '@app/hooks';
import { DEFAULT_PAGE_SIZE, defaultEventsOrderBy } from '@app/pages/Bundles/constants';
import { BundleEvent, EventsSorting } from '@app/api/graphQL/bundleEvents/types';
import {
  PagePaper,
  Pagination,
  ScrollableTable,
  SelectOptionProps,
} from '@app/components';
import { useGraphQLBundleEvents } from '@app/api/graphQL/bundleEvents/bundleEvents';

import { getRFTEventsColumns } from './columnsSchema';

const EventsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, setParamToQuery } = useQueryParams();
  const { collectionId, tokenId } = useParams<{
    collectionId: string;
    tokenId: string;
  }>();
  const [queryParams, setQueryParams] = useSearchParams();
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  const [isAgeColumn, setIsAgeColumn] = useState(false);

  // get sort from query string
  const getOrderByFromQuery = () => {
    const split = sort?.split('-');
    return split ? { [split[0]]: split[1] } : ({} as EventsSorting);
  };
  const [orderBy, setOrderBy] = useState<EventsSorting>(
    getOrderByFromQuery() || defaultEventsOrderBy,
  );

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

  const { bundleEvents, isBundleEventsFetching, timestamp, count } =
    useGraphQLBundleEvents({
      token_id: Number(tokenId),
      collection_id: Number(collectionId),
      offset,
      orderBy,
      limit: pageSizeNumber,
    });

  const columns = useMemo(
    () =>
      getRFTEventsColumns(
        orderBy,
        setOrderAndQuery,
        timestamp,
        currentChain?.symbol,
        isAgeColumn,
        setIsAgeColumn,
      ),
    [orderBy, timestamp, currentChain?.symbol, isAgeColumn, setIsAgeColumn],
  );

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `${(item as BundleEvent).action}-${(item as BundleEvent).timestamp}`,
    [],
  );

  return (
    <PagePaperStyled>
      <Heading size={'2'}>Events</Heading>
      <div>
        {isBundleEventsFetching ? (
          <SkeletonWrapper>
            <Skeleton />
          </SkeletonWrapper>
        ) : (
          <>
            <ScrollableTable
              columns={columns}
              data={bundleEvents || []}
              loading={isBundleEventsFetching}
              rowKey={getRowKey}
              onRow={(event) => ({ className: !event.result ? 'failed-event' : '' })}
            />
          </>
        )}
        {!!count && (
          <BottomPaginationContainer>
            <Pagination
              count={count || 0}
              currentPage={currentPage}
              itemsName="Events"
              pageSize={pageSize}
              setPageSize={setPageSizeAndQuery}
              siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
              onPageChange={setCurrentPage}
            />
          </BottomPaginationContainer>
        )}
      </div>
    </PagePaperStyled>
  );
};

const PagePaperStyled = styled(PagePaper)`
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
    min-height: 1200px;
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
