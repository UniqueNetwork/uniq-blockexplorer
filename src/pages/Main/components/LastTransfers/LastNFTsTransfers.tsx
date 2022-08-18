import React, { VFC } from 'react';

import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { Table } from '@app/components';
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

  const { isNftTransfersFetching, nftTransfers, nftTransfersCount, timestamp } =
    useGraphQlNftTransfers({
      accountId,
      pageSize,
      orderBy: { timestamp: 'desc' },
      searchString: prettifiedBlockSearchString,
    });

  if (/[^$,-,.\d]/.test(searchString || '') || nftTransfersCount === 0) return null;

  return (
    <>
      {!isMobile && (
        <Table
          columns={getTransferNftColumns(currentChain?.network)}
          data={transfersWithTimeDifference<TokenTransaction>(nftTransfers, timestamp)}
          loading={isNftTransfersFetching}
          rowKey="block_index"
        />
      )}
      {isMobile && (
        <LastNftTransfersCardsList
          columns={getTransferNftColumns(currentChain?.network)}
          data={transfersWithTimeDifference<TokenTransaction>(nftTransfers, timestamp)}
          loading={isNftTransfersFetching}
        />
      )}
    </>
  );
};