import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { Pagination, Stub, ScrollableTable } from '@app/components';
import { useGraphQlLastTransfers, Transfer } from '@app/api';

import { getTransferColumns } from './getTransferColumns';
import { transfersWithTimeDifference } from './transfersWithTimeDifference';

export type LastTransfersProps = {
  searchString?: string;
  pageSize?: number;
  accountId?: string;
  hideButton: (val: boolean) => void;
};

export const LastCoinsTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString,
  hideButton,
}) => {
  const { currentChain } = useApi();
  const deviceSize = useDeviceSize();
  const prettifiedBlockSearchString =
    searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageSize;

  const { isTransfersFetching, timestamp, transfers, transfersCount } =
    useGraphQlLastTransfers({
      accountId,
      pageSize,
      offset,
      orderBy: { timestamp: 'desc' },
      searchString: prettifiedBlockSearchString,
    });

  useEffect(() => {
    if (
      /[^$,-,.\d]/.test(searchString || '') ||
      (transfersCount === 0 && isTransfersFetching)
    ) {
      hideButton(false);
    }

    hideButton(true);
  }, [transfersCount, isTransfersFetching, searchString, hideButton]);

  if (isTransfersFetching) {
    return (
      <SkeletonWrapper>
        <Skeleton />
      </SkeletonWrapper>
    );
  }

  if (/[^$,-,.\d]/.test(searchString || '') || transfersCount === 0) {
    return <Stub />;
  }

  return (
    <>
      <TableWrapper>
        <ScrollableTable
          columns={getTransferColumns(currentChain?.symbol, currentChain?.network)}
          data={transfersWithTimeDifference<Transfer>(transfers, timestamp)}
          loading={isTransfersFetching}
          rowKey="block_index"
        />
      </TableWrapper>
      <Pagination
        count={transfersCount}
        currentPage={currentPage}
        pageSize={pageSize}
        siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

const SkeletonWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-grow: 1;

  .unique-skeleton {
    width: 100%;
    min-height: 450px;
    border-radius: var(--gap) !important;
  }
`;

const TableWrapper = styled.div`
  && td {
    padding: calc(var(--gap) * 1.5);
  }
`;
