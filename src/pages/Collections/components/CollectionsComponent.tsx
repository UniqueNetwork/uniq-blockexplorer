import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  const offset = currentPage * pageSize;

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
      <Table
        columns={getCollectionsColumns(currentChain.network, orderBy, setOrderBy)}
        data={collections || []}
        loading={isCollectionsFetching}
        rowKey="collection_id"
      />
      <PaginationComponent
        count={collectionsCount || 0}
        currentPage={currentPage}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default CollectionsComponent;
