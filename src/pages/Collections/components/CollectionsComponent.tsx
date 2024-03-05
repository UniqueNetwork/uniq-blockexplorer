import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';

import {
  Pagination,
  ScrollableTable,
  SelectOptionProps,
  ViewType,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from '@app/components';
import { DeviceSize, useApi, useDeviceSize, useQueryParams } from '@app/hooks';
import {
  CollectionSorting,
  TokenSorting,
  TokenTypeEnum,
  useGraphQlCollections,
  useGraphQlTokens,
} from '@app/api';
import { CollectionCard } from '@app/components/CollectionCard';
import { ContentWrapper } from '@app/components/ContentWrapper';

import { defaultOrderBy } from '../constants';
import { getCollectionsColumns } from './collectionsColumnsSchema';

interface CollectionsComponentProps {
  orderBy: TokenSorting;
  setOrderBy: (orderBy: TokenSorting) => void;
  pageSize: SelectOptionProps;
  setPageSize: (pageSize: SelectOptionProps) => void;
  view: ViewType;
  type: TokenTypeEnum;
}

const CollectionsComponent = ({
  orderBy,
  pageSize,
  setOrderBy,
  setPageSize,
  view,
  type,
}: CollectionsComponentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    searchString: searchFromQuery,
    accountId,
    nesting,
    sort,
    setParamToQuery,
  } = useQueryParams();
  const [queryParams, setQueryParams] = useSearchParams();
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  // get sort from query string
  const getOrderByFromQuery = () => {
    const split = sort?.split('-');
    return split ? { [split[0]]: split[1] } : ({} as CollectionSorting);
  };

  useEffect(() => {
    setOrderBy(getOrderByFromQuery());
  }, [sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [nesting]);

  const pageSizeNumber = pageSize.id as number;

  const offset = (currentPage - 1) * pageSizeNumber;

  const setOrderAndQuery = (sorting: CollectionSorting) => {
    if (!Object.values(sorting)[0]) {
      sorting = defaultOrderBy;
    }

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

  let tokensFilter;

  const filter = useMemo(() => {
    const filters = {
      _or: [{}],
      nesting_enabled: {},
      burned: { _eq: 'false' },
      mode: { _eq: type },
    };

    if (accountId) {
      filters._or = [
        { owner: { _eq: accountId } },
        { owner_normalized: { _eq: accountId } },
      ];
      tokensFilter = { ...filters };
    }

    if (nesting === 'true') {
      filters.nesting_enabled = { _eq: 'true' };
    }

    return filters;
  }, [accountId, nesting, type]);

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
      tokens?.find((token) => token.collection_id === collection.collection_id)?.image ||
      '',
  }));

  return (
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

export default CollectionsComponent;
