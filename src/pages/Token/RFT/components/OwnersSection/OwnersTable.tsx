import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Heading, Skeleton } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';
import styled from 'styled-components/macro';

import { DeviceSize, useDeviceSize } from '@app/hooks';
import { EventsSorting } from '@app/api/graphQL/tokensEvents/types';
import { DEFAULT_PAGE_SIZE, defaultOwnersOrderBy } from '@app/pages/Bundles/constants';
import {
  PagePaper,
  Pagination,
  ScrollableTable,
  SelectOptionProps,
} from '@app/components';
import { GetOwnersColumns } from '@app/pages/Token/RFT/components/OwnersSection/columnsSchema';
import { useGraphQLRftOwners } from '@app/api/graphQL/rftOwners/rftOwners';
import { OwnersSorting } from '@app/api/graphQL/rftOwners/types';

type OwnersItem = {
  account: string;
  fractions: number;
};

type OwnersTableProps = {
  totalPieces: number;
};

const OwnersTable = ({ totalPieces }: OwnersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useSearchParams();
  const deviceSize = useDeviceSize();
  const { collectionId, tokenId } = useParams<{
    collectionId: string;
    tokenId: string;
  }>();

  const [orderBy, setOrderBy] = useState<OwnersSorting>(defaultOwnersOrderBy);

  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: Number(queryParams.get('pageSize')) || DEFAULT_PAGE_SIZE,
    title: queryParams.get('pageSize') || DEFAULT_PAGE_SIZE.toString(),
  });
  const pageSizeNumber = pageSize.id as number;

  const offset = (currentPage - 1) * pageSizeNumber;

  const setOrderAndQuery = (sorting: EventsSorting) => {
    setOrderBy(sorting);
  };

  const setPageSizeAndQuery = (option: SelectOptionProps) => {
    setPageSize(option);
    queryParams.set('pageSize', `${option.title}`);
    setQueryParams(queryParams);
  };

  const columns = useMemo(
    () => GetOwnersColumns(orderBy, setOrderAndQuery, totalPieces, deviceSize),
    [orderBy, deviceSize, totalPieces],
  );

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `${(item as OwnersItem).account}-${(item as OwnersItem).fractions}`,
    [],
  );

  const { owners, isTokenOwnersFetching, count } = useGraphQLRftOwners({
    collectionId: Number(collectionId),
    tokenId: Number(tokenId),
    offset,
    orderBy,
    limit: pageSizeNumber,
  });

  if (!collectionId || !tokenId) return null;

  return (
    <PagePaper>
      <Heading size={'2'}>Owners</Heading>
      {isTokenOwnersFetching ? (
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      ) : (
        <>
          <ScrollableTable
            columns={columns}
            data={owners || []}
            loading={false}
            rowKey={getRowKey}
          />
        </>
      )}
      {!!count && (
        <BottomPaginationContainer>
          <Pagination
            count={count || 0}
            currentPage={currentPage}
            itemName="Owner"
            pageSize={pageSize}
            setPageSize={setPageSizeAndQuery}
            siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
            onPageChange={setCurrentPage}
          />
        </BottomPaginationContainer>
      )}
    </PagePaper>
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

const BottomPaginationContainer = styled.div`
  .pagination {
    display: flex;
    flex-direction: column;
    margin-top: calc(var(--gap) * 2.25);
    align-items: flex-end;
    gap: calc(var(--gap));
    > div:first-of-type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      > div:last-of-type {
        display: flex;
        align-items: center;
        gap: calc(var(--gap) / 2);
      }
    }
  }
`;

export default OwnersTable;
