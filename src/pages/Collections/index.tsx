import { Skeleton } from '@unique-nft/ui-kit';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';

import { UserEvents } from '@app/analytics/user_analytics';
import { CollectionSorting, useGraphQlCollections, useGraphQlTokens } from '@app/api';
import {
  PagePaperWrapper,
  Pagination,
  ScrollableTable,
  SelectOptionProps,
} from '@app/components';
import { CollectionCard } from '@app/components/CollectionCard';
import { PageHeading } from '@app/components/PageHeading';
import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import ToolbarContext from '@app/toolbarContext/toolbarContext';
import { logUserEvents } from '@app/utils';

import { getCollectionsColumns } from './components/collectionsColumnsSchema';
import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, OPTIONS } from './constants';

export enum ViewType {
  Grid = 'Grid',
  List = 'List',
}

const CollectionsPage: FC = () => {
  const {
    view,
    setView,
    searchString,
    queryParams,
    setQueryParams,
    orderBy,
    setOrderBy,
    nesting,
    setNesting,
  } = useContext(ToolbarContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, selectSort] = useState<SelectOptionProps>();
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  const pageSize = DEFAULT_PAGE_SIZE;
  const offset = (currentPage - 1) * pageSize;

  const setOrderAndQuery = (sorting: CollectionSorting) => {
    setOrderBy(sorting);
    queryParams.set(
      'sort',
      // @ts-ignore
      `${Object.keys(sorting)[0]}-${sorting[Object.keys(sorting)[0]]}`,
    );
    setQueryParams(queryParams);
  };

  const setNestingAndQuery = () => {
    setNesting(!nesting);
    queryParams.set('nesting', `${!nesting}`);
    setQueryParams(queryParams);
  };

  // get sort from query string
  useEffect(() => {
    if (queryParams.get('sort')) {
      const split = queryParams.get('sort')?.split('-');
      const orderBy = split ? { [split[0]]: split[1] } : ({} as CollectionSorting);
      setOrderBy(orderBy);
    }

    if (queryParams.get('collections_view')) {
      setView(queryParams.get('collections_view') as ViewType);
    }
  }, [queryParams]);

  let tokensFilter;

  const filter = useMemo(() => {
    const accountId = queryParams.get('accountId');
    let filters = { _or: [{}], nesting_enabled: {} };

    if (accountId) {
      filters._or = [
        { owner: { _eq: accountId } },
        { owner_normalized: { _eq: accountId } },
      ];
      tokensFilter = { ...filters };
    }

    if (nesting) {
      filters.nesting_enabled = { _eq: 'true' };
    }

    return filters;
  }, [queryParams]);

  const { collections, collectionsCount, isCollectionsFetching, timestamp } =
    useGraphQlCollections({
      filter,
      offset,
      orderBy,
      pageSize: pageSizeNumber,
      searchString,
    });

  const { tokens } = useGraphQlTokens({
    filter: tokensFilter,
    offset: 0,
    pageSize: pageSizeNumber,
  });

  const collectionsWithTokenCover = collections?.map((collection) => ({
    ...collection,
    collection_cover:
      collection.collection_cover ||
      tokens?.find((token) => token.collection_id === collection.collection_id)?.image
        ?.fullUrl ||
      '',
  }));

  // useEffect(() => {
  //   setSearchString(sea);
  // }, [searchFromQuery]);

  const selectGrid = () => {
    logUserEvents(UserEvents.Click.ON_GRID_VIEW_COLLECTIONS);
    setView(ViewType.Grid);
    queryParams.set('collections_view', `${ViewType.Grid}`);
    setQueryParams(queryParams);
  };

  const selectSorting = (selected: SelectOptionProps) => {
    const option = OPTIONS.find((item) => {
      return item.id === selected.id;
    });

    if (option && option.sortField) {
      selectSort(option);
      setOrderBy({ [option.sortField]: option.sortDir });
      queryParams.set('sort', `${option.sortField}-${option.sortDir}`);
      setQueryParams(queryParams);
    }
  };

  const selectList = () => {
    logUserEvents(UserEvents.Click.ON_LIST_VIEW_COLLECTIONS);
    setView(ViewType.List);
    queryParams.set('collections_view', `${ViewType.List}`);
    setQueryParams(queryParams);
  };

  return (
    <div>
      <PageHeading title="Collections" />
      <PagePaper>
        <RightMenu
          key="top-right-menu"
          nesting={nesting}
          selectSort={selectSorting}
          selectGrid={selectGrid}
          selectList={selectList}
          setNesting={setNestingAndQuery}
          view={view}
        />
        <div>
          <TopPaginationContainer>
            <Pagination
              count={collectionsCount || 0}
              currentPage={currentPage}
              itemsName="Collections"
              pageSize={pageSize}
              setPageSize={setPageSizeAndQuery}
              siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
              onPageChange={setCurrentPage}
            />
          </TopPaginationContainer>
          {isCollectionsFetching ? (
            <SkeletonWrapper>
              <Skeleton />
            </SkeletonWrapper>
          ) : (
            <>
              {view === ViewType.List ? (
                <ScrollableTable
                  columns={getCollectionsColumns(
                    currentChain.network,
                    orderBy,
                    setOrderAndQuery,
                    timestamp,
                  )}
                  data={collections || []}
                  loading={isCollectionsFetching}
                  rowKey="collection_id"
                />
              ) : (
                <CollectionsList>
                  {collectionsWithTokenCover.map((collection) => (
                    <CollectionCard
                      key={`collection-${collection.collection_id}`}
                      timestamp={timestamp}
                      {...collection}
                    />
                  ))}
                </CollectionsList>
              )}
            </>
          )}
          {!!collectionsCount && (
            <BottomPaginationContainer>
              <Pagination
                count={collectionsCount || 0}
                currentPage={currentPage}
                itemsName="Collections"
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

const CollectionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: var(--gap);
  grid-row-gap: var(--gap);
  position: relative;
  margin-bottom: calc(var(--gap) * 1.5);

  @media (min-width: 576px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
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

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
`;

export default CollectionsPage;
