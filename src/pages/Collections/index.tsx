import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';

import {
  Pagination,
  PagePaperWrapper,
  ScrollableTable,
  SelectOptionProps,
  ViewType,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from '@app/components';
import { DeviceSize, useApi, useDeviceSize, useQueryParams } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { CollectionSorting, useGraphQlCollections, useGraphQlTokens } from '@app/api';
import { CollectionCard } from '@app/components/CollectionCard';
import { PageHeading } from '@app/components/PageHeading';
import { ContentWrapper } from '@app/components/ContentWrapper';

import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import { getCollectionsColumns } from './components/collectionsColumnsSchema';

const CollectionsPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    searchString: searchFromQuery,
    accountId,
    nesting,
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

  const setNestingAndQuery = () => {
    setCurrentPage(1);
    setParamToQuery([{ name: 'nesting', value: nesting === 'true' ? 'false' : 'true' }]);
  };

  const setPageSizeAndQuery = (option: SelectOptionProps) => {
    setPageSize(option);
    queryParams.set('pageSize', `${option.title}`);
    setQueryParams(queryParams);
  };

  let tokensFilter;

  const filter = useMemo(() => {
    let filters = { _or: [{}] }; // { _or: [{}], nesting_enabled: {}, burned: { _eq: 'false' } };

    if (accountId) {
      filters._or = [
        { owner: { _eq: accountId } },
        { owner_normalized: { _eq: accountId } },
      ];
      tokensFilter = { ...filters };
    }

    // if (nesting === 'true') {
    //   filters.nesting_enabled = { _eq: 'true' };
    // }

    return filters;
  }, [accountId, nesting]);

  const { collections, collectionsCount, isCollectionsFetching, timestamp } =
    useGraphQlCollections({
      filter,
      offset,
      orderBy,
      pageSize: pageSizeNumber,
      searchString: searchFromQuery,
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
      <PageHeading title="Collections" />
      <PagePaper>
        <RightMenu
          key="top-right-menu"
          nestingOn={nesting === 'true'}
          selectSort={selectSorting}
          selectGrid={selectGrid}
          selectList={selectList}
          setNestingOn={setNestingAndQuery}
          view={view as ViewType}
        />
        <ContentWrapper>
          <TopPaginationContainer>
            <Pagination
              count={collectionsCount || 0}
              currentPage={currentPage}
              itemName="Collection"
              pageSize={pageSize}
              setPageSize={setPageSizeAndQuery}
              siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
              pageSizeOptions={[
                ...DEFAULT_PAGE_SIZE_OPTIONS,
                { id: 48, title: '48' },
                { id: 60, title: '60' },
              ]}
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
                itemName="Collection"
                pageSize={pageSize}
                setPageSize={setPageSizeAndQuery}
                siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
                pageSizeOptions={[
                  ...DEFAULT_PAGE_SIZE_OPTIONS,
                  { id: 48, title: '48' },
                  { id: 60, title: '60' },
                ]}
                onPageChange={setCurrentPage}
              />
            </BottomPaginationContainer>
          )}
        </ContentWrapper>
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
