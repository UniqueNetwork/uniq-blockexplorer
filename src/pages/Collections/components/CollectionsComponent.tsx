import React, { useEffect, useMemo, useState } from 'react';
import { normalizeSubstrate } from '@app/utils';
import { useApi } from '@app/hooks';

import { CollectionsComponentProps } from '../types';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import PaginationComponent from '../../../components/Pagination';
import Table from '../../../components/Table';
import { getCollectionsColumns } from './collectionsColumnsSchema';
import { collections as gqlCollections, CollectionSorting } from '../../../api/graphQL';
import { useSearchParams } from 'react-router-dom';

const CollectionsComponent = ({
  pageSize = 20,
  orderBy: defaultOrderBy = { date_of_creation: 'desc' },
  searchString
}: CollectionsComponentProps) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  const [queryParams] = useSearchParams();

  const [orderBy, setOrderBy] = useState<CollectionSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filter = useMemo(() => {
    const accountId = queryParams.get('accountId');

    if (accountId) return { owner: { _eq: normalizeSubstrate(accountId) } };

    return undefined;
  }, [queryParams]);

  const {
    collections,
    collectionsCount,
    fetchMoreCollections,
    isCollectionsFetching
  } = gqlCollections.useGraphQlCollections({ filter, orderBy: defaultOrderBy, pageSize });

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;

    void fetchMoreCollections({
      filter,
      limit: pageSize,
      offset,
      orderBy,
      searchString
    });
  }, [pageSize, currentPage, orderBy, searchString, fetchMoreCollections]);

  return (
    <>
      <Table
        columns={getCollectionsColumns(currentChain.network, orderBy, setOrderBy)}
        data={collections || []}
        loading={isCollectionsFetching}
        rowKey={'collection_id'}
      />
      <PaginationComponent
        count={collectionsCount || 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default CollectionsComponent;
