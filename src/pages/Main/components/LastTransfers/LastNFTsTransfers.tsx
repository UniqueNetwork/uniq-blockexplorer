import React, { VFC } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { Stub, Table } from '@app/components';
import {
  TokenTransaction,
  useGraphQlNftTransfers,
} from '@app/api/graphQL/nftTransactions';
import { getTransferNftColumns } from '@app/pages/Main/components/LastTransfers/getTransferNftColumns';

import { transfersWithTimeDifference } from './transfersWithTimeDifference';
import { LastNftTransfersCardsList } from './LastNftTransfersCardsList';

export type LastTransfersProps = {
  searchString?: string;
  pageSize?: number;
  accountId?: string;
};

export const LastNFTsTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString,
}) => {
  const { currentChain } = useApi();
  const deviceSize = useDeviceSize();
  const prettifiedBlockSearchString =
    searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
  const isMobile = deviceSize <= DeviceSize.sm;

  const { isNftTransfersFetching, nftTransfers, nftTransfersCount } =
    useGraphQlNftTransfers({
      accountId,
      pageSize,
      searchString: prettifiedBlockSearchString,
    });

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
      {!isMobile && (
        <Table
          columns={getTransferNftColumns(currentChain?.network)}
          data={transfersWithTimeDifference<TokenTransaction>(nftTransfers)}
          loading={isNftTransfersFetching}
          rowKey="block_index"
        />
      )}
      {isMobile && (
        <LastNftTransfersCardsList
          columns={getTransferNftColumns(currentChain?.network)}
          data={transfersWithTimeDifference<TokenTransaction>(nftTransfers)}
          loading={isNftTransfersFetching}
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
