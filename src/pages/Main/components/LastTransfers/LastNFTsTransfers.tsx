import React, { VFC } from 'react';

import { DeviceSize2, useApi, useDeviceSize2 } from '@app/hooks';
import { Table} from '@app/components';
import { useGraphQlLastTransfers } from '@app/api';

import { getTransferColumns } from './getTransferColumns';
import { transfersWithTimeDifference } from './transfersWithTimeDifference';
import { LastTransfersCardsList } from './LastTransfersCardsList';

export type LastTransfersProps = {
  searchString?: string
  pageSize?: number
  accountId?: string
}

export const LastNFTsTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString
}) => {
  const { currentChain } = useApi();
  const deviceSize = useDeviceSize2();
  const prettifiedBlockSearchString = searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
  const isMobile = deviceSize <= DeviceSize2.sm;

  const { isTransfersFetching, transfers, transfersCount } =
    useGraphQlLastTransfers({ accountId, pageSize, searchString: prettifiedBlockSearchString });

  if (/[^$,-,.\d]/.test(searchString || '') || transfersCount === 0) return null;

  return (
    <>
      { !isMobile && (
        <Table
          columns={getTransferColumns(
            currentChain?.symbol,
            currentChain?.network
          )}
          data={transfersWithTimeDifference(transfers)}
          loading={isTransfersFetching}
          rowKey='block_index'
        />
      )}
      { isMobile && (
        <LastTransfersCardsList
          columns={getTransferColumns(
            currentChain?.symbol,
            currentChain?.network
          )}
          data={transfersWithTimeDifference(transfers)}
          loading={isTransfersFetching}
        />
      )}
    </>
  );
};