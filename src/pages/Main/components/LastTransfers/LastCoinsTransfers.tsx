import React, { useMemo, VFC } from 'react';

import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { Table } from '@app/components';
import { useGraphQlLastTransfers, Transfer, CollectionSorting } from '@app/api';

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
    orderBy: { timestamp: 'desc' },
    searchString: prettifiedBlockSearchString,
  });

  if (/[^$,-,.\d]/.test(searchString || '') || transfersCount === 0) return null;

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
