import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';

import {
  Pagination,
  PagePaperWrapper,
  ScrollableTable,
  SelectOptionProps,
  ViewType,
} from '@app/components';
import { DeviceSize, useApi, useDeviceSize, useQueryParams } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { CollectionSorting, Token, useGraphQlBundles } from '@app/api';
import { PageHeading } from '@app/components/PageHeading';

import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import BundlesGrid from './components/BundlesGrid';
import { getBundlesColumns } from './components/bundlesColumnsSchema';

const BundlesPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    searchString: searchFromQuery,
    accountId,
    sort,
    setParamToQuery,
    view,
  } = useQueryParams();
  const [queryParams, setQueryParams] = useSearchParams();
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  // get sort from query string
  const getOrderByFromQuery = () => {
    const split = sort?.split('-');
    return split ? { [split[0]]: split[1] } : ({} as CollectionSorting);
  };
  const [orderBy, setOrderBy] = useState<CollectionSorting>(
    getOrderByFromQuery() || defaultOrderBy,
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

  const setOrderAndQuery = (sorting: CollectionSorting) => {
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

  const filter = useMemo(() => {
    let filters = { _or: [{}], burned: { _eq: 'false' } };

    if (accountId) {
      filters._or = [
        { owner: { _eq: accountId } },
        { owner_normalized: { _eq: accountId } },
      ];
    }

    return filters;
  }, [accountId]);

  const { bundles, bundlesCount, isBundlesFetching, timestamp } = useGraphQlBundles({
    filter,
    offset,
    orderBy,
    pageSize: pageSizeNumber,
    searchString: searchFromQuery,
  });

  const bundleColumns = getBundlesColumns(
    currentChain.network,
    orderBy,
    setOrderAndQuery,
    timestamp,
  );

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `token-${(item as Token).collection_id}-${(item as Token).token_id}`,
    [],
  );

  const selectGrid = () => {
    logUserEvents(UserEvents.Click.ON_GRID_VIEW_COLLECTIONS);
    setParamToQuery([{ name: 'view', value: `${ViewType.Grid}` }]);
  };

  const selectSorting = (selected: SelectOptionProps) => {
    const option = OPTIONS.find((item) => {
      return item.id === selected.id;
    });

    if (option && option.sortField) {
      setOrderBy({ [option.sortField]: option.sortDir });
      setParamToQuery([{ name: 'sort', value: `${option.sortField}-${option.sortDir}` }]);
    }
  };

  const selectList = () => {
    logUserEvents(UserEvents.Click.ON_LIST_VIEW_COLLECTIONS);
    setParamToQuery([{ name: 'view', value: `${ViewType.List}` }]);
  };

  return (
    <div>
      <PageHeading title="Bundles" />
      <PagePaper>
        <RightMenu
          key="top-right-menu"
          selectSort={selectSorting}
          selectGrid={selectGrid}
          selectList={selectList}
          view={view as ViewType}
        />
        <div>
          <TopPaginationContainer>
            <Pagination
              count={bundlesCount || 0}
              currentPage={currentPage}
              itemsName="Bundles"
              pageSize={pageSize}
              setPageSize={setPageSizeAndQuery}
              siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
              onPageChange={setCurrentPage}
            />
          </TopPaginationContainer>
          {isBundlesFetching ? (
            <SkeletonWrapper>
              <Skeleton />
            </SkeletonWrapper>
          ) : (
            <>
              {view === ViewType.List ? (
                <ScrollableTable
                  columns={bundleColumns}
                  data={bundles || []}
                  loading={isBundlesFetching}
                  rowKey={getRowKey}
                />
              ) : (
                <BundlesGrid
                  chainNetwork={currentChain.network}
                  timestamp={timestamp}
                  bundles={bundles || []}
                />
              )}
            </>
          )}
          {!!bundlesCount && (
            <BottomPaginationContainer>
              <Pagination
                count={bundlesCount || 0}
                currentPage={currentPage}
                itemsName="Bundles"
                pageSize={pageSize}
                setPageSize={setPageSizeAndQuery}
                siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
                onPageChange={setCurrentPage}
              />
            </BottomPaginationContainer>
          )}
        </div>
      </PagePaper>
    </div>
  );
};

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

const PagePaper = styled(PagePaperWrapper)`
  > div:first-of-type {
    margin-bottom: calc(var(--gap) * 1.5);
  }
`;

const TopPaginationContainer = styled.div`
  .pagination {
    display: flex;
    flex-direction: column;
    margin-bottom: calc(var(--gap) * 2);
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

export default BundlesPage;
