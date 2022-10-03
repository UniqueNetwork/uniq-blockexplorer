import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';

import {
  Pagination,
  PagePaperWrapper,
  ScrollableTable,
  SelectOptionProps,
} from '@app/components';
import { DeviceSize, useApi, useDeviceSize, useSearchFromQuery } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { CollectionSorting, useGraphQlCollections, useGraphQlTokens } from '@app/api';
import { CollectionCard } from '@app/components/CollectionCard';
import { PageHeading } from '@app/components/PageHeading';

import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import { getCollectionsColumns } from './components/collectionsColumnsSchema';

export enum ViewType {
  Grid = 'Grid',
  List = 'List',
}

const CollectionsPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchFromQuery = useSearchFromQuery();
  const [view, setView] = useState<ViewType>(ViewType.Grid);
  const [, selectSort] = useState<SelectOptionProps>();
  const [queryParams, setQueryParams] = useSearchParams();
  const searchString = useSearchFromQuery();
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  const [orderBy, setOrderBy] = useState<CollectionSorting>(defaultOrderBy);
  const [, setSearchString] = useState<string | undefined>(searchFromQuery);
  const [nestingOn, setNestingOn] = useState<boolean>(
    queryParams.get('nesting') === 'true',
  );
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
    setNestingOn(!nestingOn);
    queryParams.set('nesting', `${!nestingOn}`);
    setQueryParams(queryParams);
  };

  // get sort from query string
  useEffect(() => {
    if (queryParams.get('sort')) {
      const split = queryParams.get('sort')?.split('-');
      const orderBy = split ? { [split[0]]: split[1] } : ({} as CollectionSorting);
      setOrderBy(orderBy);
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

    if (nestingOn) {
      filters.nesting_enabled = { _eq: 'true' };
    }

    return filters;
  }, [queryParams]);

  const { collections, collectionsCount, isCollectionsFetching, timestamp } =
    useGraphQlCollections({
      filter,
      offset,
      orderBy,
      pageSize,
      searchString,
    });

  const { tokens } = useGraphQlTokens({
    filter: tokensFilter,
    offset: 0,
    pageSize,
  });

  const collectionsWithTokenCover = collections?.map((collection) => ({
    ...collection,
    collection_cover:
      collection.collection_cover ||
      tokens?.find((token) => token.collection_id === collection.collection_id)?.image
        ?.fullUrl ||
      '',
  }));

  useEffect(() => {
    setSearchString(searchFromQuery);
  }, [searchFromQuery]);

  const selectGrid = () => {
    logUserEvents(UserEvents.Click.ON_GRID_VIEW_COLLECTIONS);
    setView(ViewType.Grid);
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
  };

  return (
    <div>
      <PageHeading title="Collections" />
      <PagePaper>
        <RightMenu
          key="top-right-menu"
          nestingOn={nestingOn}
          selectSort={selectSorting}
          selectGrid={selectGrid}
          selectList={selectList}
          setNestingOn={setNestingAndQuery}
          view={view}
        />
        <div>
          <TopPaginationContainer>
            <Pagination
              count={collectionsCount || 0}
              currentPage={currentPage}
              itemsName="Collections"
              pageSize={{ id: pageSize }}
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
                pageSize={{ id: pageSize }}
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
    margin-bottom: calc(var(--gap) * 2);
  }
`;

const BottomPaginationContainer = styled.div`
  .pagination {
    margin-top: calc(var(--gap) * 2.25);
  }
`;

export default CollectionsPage;
