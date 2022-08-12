import React, { VFC } from 'react';

import { DeviceSize2, useApi, useDeviceSize2 } from '@app/hooks';
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
  const deviceSize = useDeviceSize2();
  const prettifiedBlockSearchString =
    searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
  const isMobile = deviceSize <= DeviceSize2.sm;

  const { isNftTransfersFetching, nftTransfers, nftTransfersCount } =
    useGraphQlNftTransfers({
      accountId,
      pageSize,
      searchString: prettifiedBlockSearchString,
    });

  // eslint-disable-next-line no-console
  console.log('nftTransfers', nftTransfers);

  if (/[^$,-,.\d]/.test(searchString || '') || nftTransfersCount === 0) return null;

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
