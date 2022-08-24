import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import { CollectionSorting, useGraphQlCollections } from '@app/api';
import { useDeviceSize, DeviceSize, useApi } from '@app/hooks';

import { CollectionsComponentProps } from '../types';
import PaginationComponent from '../../../components/Pagination';
import Table from '../../../components/Table';
import { getCollectionsColumns } from './collectionsColumnsSchema';

const CollectionsComponent = ({
  pageSize = 20,
  orderBy: defaultOrderBy = { date_of_creation: 'desc' },
}: CollectionsComponentProps) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  const [queryParams] = useSearchParams();
  const searchString = queryParams.get('search') || '';

  const [orderBy, setOrderBy] = useState<CollectionSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
        <Table
          columns={getCollectionsColumns(currentChain.network, orderBy, setOrderBy)}
          data={collections || []}
          loading={isCollectionsFetching}
          rowKey="collection_id"
        />
      )}
      {!isCollectionsFetching && collectionsCount > 0 && (
        <PaginationComponent
          count={collectionsCount || 0}
          currentPage={currentPage}
          pageSize={pageSize}
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
    min-height: 150px;
    border-radius: var(--gap) !important;
  }
`;

export default CollectionsComponent;
