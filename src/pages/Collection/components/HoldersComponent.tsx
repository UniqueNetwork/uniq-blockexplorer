import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import Table from '../../../components/Table';
import { Holder, holders as gqlHolders, HolderSorting } from '../../../api/graphQL';
import PaginationComponent from '../../../components/Pagination';
import { useDeviceSize, DeviceSize } from '@app/hooks';
import { DefaultRecordType } from 'rc-table/lib/interface';
import TableSortableColumnTitle from '../../../components/TableSortableColumnTitle';

interface HoldersComponentProps {
  collectionId?: string
  pageSize?: number
  defaultOrderBy?: HolderSorting
}

const getColumns = (orderBy: HolderSorting, onOrderChange: (orderBy: HolderSorting) => void) => ([
  {
    dataIndex: 'owner',
    key: 'owner',
    render: (value: string) => <AccountLinkComponent value={value} />,
    title: 'Owner',
    width: 100
  },
  {
    dataIndex: 'count',
    key: 'count',
    title: <TableSortableColumnTitle
      dataIndex={'count'}
      onOrderChange={onOrderChange}
      orderBy={orderBy}
      title={'Items'}
    />,
    width: 100
  }
]);

const HoldersComponent: FC<HoldersComponentProps> = ({ collectionId, pageSize = 10, defaultOrderBy = { count: 'desc' } }) => {
  const [orderBy, setOrderBy] = useState<HolderSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const deviceSize = useDeviceSize();

  const { fetchMoreHolders, holders, holdersCount, isHoldersFetching } = gqlHolders.useGraphQlHolders({
    filter: { collection_id: { _eq: Number(collectionId) } },
    orderBy: defaultOrderBy,
    pageSize
  });

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) => `holder-${(item as Holder).collection_id}-${(item as Holder).owner}`,
    []
  );

  const fetchHolders = useCallback((currentPage: number, orderBy: HolderSorting) => {
    const offset = (currentPage - 1) * pageSize;

    void fetchMoreHolders({
      filter: { collection_id: { _eq: Number(collectionId) } },
      limit: pageSize,
      offset,
      orderBy
    });
  }, [collectionId, fetchMoreHolders, pageSize]);

  const onOrderChange = useCallback((_orderBy: HolderSorting) => {
    setOrderBy(_orderBy);

    fetchHolders(currentPage, _orderBy);
  }, [currentPage, fetchHolders]);

  const onPageChange = useCallback((_currentPage: number) => {
    setCurrentPage(_currentPage);

    fetchHolders(_currentPage, orderBy);
  }, [fetchHolders, orderBy]);

  return (
    <HolderWrapper>
      <Table
        columns={getColumns(orderBy, onOrderChange)}
        data={holders}
        loading={isHoldersFetching}
        rowKey={getRowKey}
      />
      <PaginationComponent
        count={holdersCount || 0}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </HolderWrapper>
  );
};

const HolderWrapper = styled.div`
  margin-top: var(--gap);
`;

export default HoldersComponent;
