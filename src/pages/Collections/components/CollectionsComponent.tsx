import React, { useEffect, useState } from 'react';

import { CollectionsComponentProps } from '../types';
import { useApi } from '../../../hooks/useApi';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import PaginationComponent from '../../../components/Pagination';
import Table from '../../../components/Table';
import { getCollectionsColumns } from './collectionsColumnsSchema';
import { collections as gqlCollections, CollectionSorting } from '../../../api/graphQL';

const CollectionsComponent = ({
  pageSize = 20,
  orderBy: defaultOrderBy = { date_of_creation: 'desc' },
  searchString
}: CollectionsComponentProps) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  const [orderBy, setOrderBy] = useState<CollectionSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    collections,
    collectionsCount,
    fetchMoreCollections,
    isCollectionsFetching
  } = gqlCollections.useGraphQlCollections({ orderBy: defaultOrderBy, pageSize });

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;

    void fetchMoreCollections({
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
