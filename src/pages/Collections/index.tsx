import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';

import {
  Pagination,
  PagePaperWrapper,
  ScrollableTable,
  SelectOptionProps,
} from '@app/components';
import {
  DeviceSize,
  DeviceSizes,
  useApi,
  useDeviceSize,
  useSearchFromQuery,
} from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { CollectionSorting, useGraphQlCollections, useGraphQlTokens } from '@app/api';
// import CollectionsComponent from './components/CollectionsComponent';
import { CollectionCard } from '@app/components/CollectionCard';

import { RightMenu } from './components/RightMenu';
import { ViewType } from './components/TokensComponent';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import SearchComponent from '../../components/SearchComponent';
import { getCollectionsColumns } from './components/collectionsColumnsSchema';

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
  const [nestingOn, setNestingOn] = useState<boolean>(false);
  const pageSize = DEFAULT_PAGE_SIZE;
  const offset = (currentPage - 1) * pageSize;

  const filter = useMemo(() => {
    const accountId = queryParams.get('accountId');

    if (accountId) {
      return {
        _or: [{ owner: { _eq: accountId } }, { owner_normalized: { _eq: accountId } }],
      };
    }

    return undefined;
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
    filter,
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

  const onSearchChange = (value: string) => {
    setSearchString(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <TopBar>
        <Title>Collections</Title>
      </TopBar>
      <PagePaper>
        <RightMenu
          key="top-right-menu"
          nestingOn={nestingOn}
          selectSort={selectSorting}
          selectGrid={selectGrid}
          selectList={selectList}
          setNestingOn={setNestingOn}
          view={view}
        />
        <div>
          <SearchWrapper
            placeholder="NFT / collection"
            // value={searchString}
            onSearchChange={onSearchChange}
          />
          <TopPaginationContainer>
            <Pagination
              count={collectionsCount || 0}
              currentPage={currentPage}
              itemsName="Collections"
              pageSize={{ id: pageSize }}
              // setPageSize={setPageSize}
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
                    setOrderBy,
                  )}
                  data={collections || []}
                  loading={isCollectionsFetching}
                  rowKey="collection_id"
                />
              ) : (
                // <ScrollableTable
                //   columns={tokenColumns}
                //   data={tokens || []}
                //   loading={isTokensFetching}
                //   rowKey={getRowKey}
                // />
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
          <BottomPaginationContainer>
            <Pagination
              count={collectionsCount || 0}
              currentPage={currentPage}
              itemsName="Collections"
              pageSize={{ id: pageSize }}
              // setPageSize={setPageSize}
              siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
              onPageChange={setCurrentPage}
            />
          </BottomPaginationContainer>
        </div>
      </PagePaper>
    </div>
  );
};

const SearchWrapper = styled(SearchComponent)`
  margin-bottom: calc(var(--gap) * 1.5);
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

const PagePaper = styled(PagePaperWrapper)`
  > div:first-of-type {
    margin-bottom: calc(var(--gap) * 3);
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

const TopBar = styled.div`
  display: grid;
  grid-column-gap: calc(var(--gap) * 2);
  grid-template-columns: 1fr 560px 72px;
  margin-bottom: calc(var(--gap) * 2.5);

  .unique-select .select-wrapper > svg {
    z-index: unset;
  }

  @media (max-width: ${DeviceSizes.sm}) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
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
