import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ColumnType, DefaultRecordType } from 'rc-table/lib/interface';
import { Heading, Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, useApi, useDeviceSize, useQueryParams } from '@app/hooks';
import { DEFAULT_PAGE_SIZE, defaultEventsOrderBy } from '@app/pages/Bundles/constants';
import {
  TokensEvent,
  EventsSorting,
  TokenKeys,
} from '@app/api/graphQL/tokensEvents/types';
import { Pagination, ScrollableTable, SelectOptionProps, Stub } from '@app/components';
import { useGraphQLTokensEvents } from '@app/api/graphQL/tokensEvents/tokensEvents';
import { getBundleEventsAccountsPageColumns } from '@app/pages/Account/components/BundlesComponent/Events/columnsSchema';

import { getBundleEventsColumns } from './columnsSchema';

type TGetEventsColumns = (arg: {
  orderBy: EventsSorting;
  onOrderChange: (orderBy: EventsSorting) => void;
  timestamp: number;
  tokenSymbol: string;
  isAgeColumn: boolean;
  setIsAgeColumn: (newIsAgeColumn: boolean) => void;
  chainId?: string;
}) => ColumnType<DefaultRecordType>[];

const EventsTable: FC<{
  header?: string;
  accountId?: string;
  getEventsColumns?: TGetEventsColumns;
  tokens: TokenKeys[];
}> = ({ accountId, getEventsColumns, tokens, header }) => {
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

  const { tokensEvents, isTokenEventsFetching, timestamp, count } =
    useGraphQLTokensEvents({
      tokens,
      offset,
      orderBy,
      limit: pageSizeNumber,
      author: accountId,
    });

  const columns = useMemo(() => {
    if (getEventsColumns)
      return getEventsColumns({
        orderBy,
        onOrderChange: setOrderAndQuery,
        timestamp,
        tokenSymbol: currentChain?.symbol,
        isAgeColumn,
        setIsAgeColumn,
        chainId: currentChain.network,
      });

    return !accountId
      ? getBundleEventsColumns({
          orderBy,
          onOrderChange: setOrderAndQuery,
          timestamp,
          tokenSymbol: currentChain?.symbol,
          isAgeColumn,
          setIsAgeColumn,
          chainId: currentChain.network,
        })
      : getBundleEventsAccountsPageColumns({
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
      `${(item as TokensEvent).action}-${(item as TokensEvent).timestamp}`,
    [],
  );

  return (
    <Wrapper>
      {header && <Heading size={'2'}>{header}</Heading>}
      <div>
        {isTokenEventsFetching ? (
          <SkeletonWrapper>
            <Skeleton />
          </SkeletonWrapper>
        ) : count > 0 ? (
          <ScrollableTable
            columns={columns}
            data={tokensEvents || []}
            loading={isTokenEventsFetching}
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
