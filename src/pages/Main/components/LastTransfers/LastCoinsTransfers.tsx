import { VFC } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { Stub, Table } from '@app/components';
import { useGraphQlLastTransfers, Transfer } from '@app/api';

import { getTransferColumns } from './getTransferColumns';
import { transfersWithTimeDifference } from './transfersWithTimeDifference';
import { LastTransfersCardsList } from './LastTransfersCardsList';

export type LastTransfersProps = {
  searchString?: string;
  pageSize?: number;
  accountId?: string;
};

export const LastCoinsTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString,
}) => {
  const { currentChain } = useApi();
  const deviceSize = useDeviceSize();
  const prettifiedBlockSearchString =
    searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
  const isMobile = deviceSize <= DeviceSize.sm;

  const { isTransfersFetching, transfers, transfersCount } = useGraphQlLastTransfers({
    accountId,
    pageSize,
    searchString: prettifiedBlockSearchString,
  });

  if (isTransfersFetching) {
    return (
      <SkeletonWrapper>
        <Skeleton />
      </SkeletonWrapper>
    );
  }

  if (/[^$,-,.\d]/.test(searchString || '') || transfersCount === 0) return <Stub />;

  return (
    <>
      {!isMobile && (
        <Table
          columns={getTransferColumns(currentChain?.symbol, currentChain?.network)}
          data={transfersWithTimeDifference<Transfer>(transfers)}
          loading={isTransfersFetching}
          rowKey="block_index"
        />
      )}
      {isMobile && (
        <LastTransfersCardsList
          columns={getTransferColumns(currentChain?.symbol, currentChain?.network)}
          data={transfersWithTimeDifference<Transfer>(transfers)}
          loading={isTransfersFetching}
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
