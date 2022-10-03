import { Skeleton } from '@unique-nft/ui-kit';
import { useContext, useMemo } from 'react';
import styled from 'styled-components';

import { useGraphQlCollections } from '@app/api';
import { Pagination, ScrollableTable, ViewType } from '@app/components';
import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { CollectionCard } from '@app/pages/Main/components/Collections/CollectionCard';
import { DEFAULT_PAGE_SIZE } from '@app/pages/Tokens/constants';
import ToolbarContext from '@app/toolbarContext/toolbarContext';

import { CollectionsComponentProps } from '../types';
import { getCollectionsColumns } from './collectionsColumnsSchema';

const CollectionsComponent = ({
  currentPage,
  pageSize = DEFAULT_PAGE_SIZE,
  setCurrentPage,
}: CollectionsComponentProps) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  const { view, queryParams, orderBy, searchString, setOrderBy } =
    useContext(ToolbarContext);

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

  return (
    <>
      {isCollectionsFetching && (
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      )}
      {!isCollectionsFetching && (
        <>
          {view === ViewType.List ? (
            <ScrollableTable
              columns={getCollectionsColumns(currentChain.network, orderBy, setOrderBy)}
              data={collections || []}
              loading={isCollectionsFetching}
              rowKey="collection_id"
            />
          ) : (
            <CollectionsList>
              {collections.map((collection) => (
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
      {!isCollectionsFetching && collectionsCount > 0 && (
        <Pagination
          count={collectionsCount || 0}
          currentPage={currentPage}
          pageSize={{ id: pageSize }}
          siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
          onPageChange={setCurrentPage}
        />
      )}
    </>
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

export default CollectionsComponent;
