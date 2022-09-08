import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import { CollectionSorting, useGraphQlCollections } from '@app/api';
import { useDeviceSize, DeviceSize, useApi, useSearchFromQuery } from '@app/hooks';
import { Pagination, ScrollableTable } from '@app/components';
import { DEFAULT_PAGE_SIZE } from '@app/pages/Tokens/constants';

import { CollectionsComponentProps } from '../types';
import { getCollectionsColumns } from './collectionsColumnsSchema';

const CollectionsComponent = ({
  currentPage,
  pageSize = DEFAULT_PAGE_SIZE,
  orderBy: defaultOrderBy = { date_of_creation: 'desc' },
  setCurrentPage,
}: CollectionsComponentProps) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  const [queryParams] = useSearchParams();
  const searchString = useSearchFromQuery();
  const [orderBy, setOrderBy] = useState<CollectionSorting>(defaultOrderBy);
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

  const { collections, collectionsCount, isCollectionsFetching } = useGraphQlCollections({
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
        <ScrollableTable
          columns={getCollectionsColumns(currentChain.network, orderBy, setOrderBy)}
          data={collections || []}
          loading={isCollectionsFetching}
          rowKey="collection_id"
        />
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

export default CollectionsComponent;
