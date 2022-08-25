import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { Pagination, Stub, ScrollableTable } from '@app/components';
import {
  TokenTransaction,
  useGraphQlNftTransfers,
} from '@app/api/graphQL/nftTransactions';
import { getTransferNftColumns } from '@app/pages/Main/components/LastTransfers/getTransferNftColumns';

import { transfersWithTimeDifference } from './transfersWithTimeDifference';

export type LastTransfersProps = {
  searchString?: string;
  pageSize?: number;
  accountId?: string;
  hideButton: (val: boolean) => void;
};

export const LastNFTsTransfers: VFC<LastTransfersProps> = ({
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

  const { isNftTransfersFetching, nftTransfers, nftTransfersCount, timestamp } =
    useGraphQlNftTransfers({
      accountId,
      pageSize,
      offset,
      orderBy: { timestamp: 'desc' },
      searchString: prettifiedBlockSearchString,
    });

  useEffect(() => {
    if (
      /[^$,-,.\d]/.test(searchString || '') ||
      (nftTransfersCount === 0 && isNftTransfersFetching)
    ) {
      hideButton(false);
    }
    hideButton(true);
  }, [nftTransfersCount, isNftTransfersFetching, searchString, hideButton]);

  if (isNftTransfersFetching) {
    return (
      <SkeletonWrapper>
        <Skeleton />
      </SkeletonWrapper>
    );
  }

  if (/[^$,-,.\d]/.test(searchString || '') || nftTransfersCount === 0) {
    return <Stub />;
  }

  return (
    <>
      <ScrollableTable
        columns={getTransferNftColumns(currentChain?.network)}
        data={transfersWithTimeDifference<TokenTransaction>(nftTransfers, timestamp)}
        loading={isNftTransfersFetching}
        rowKey="block_index"
      />
      <Pagination
        count={nftTransfersCount}
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
