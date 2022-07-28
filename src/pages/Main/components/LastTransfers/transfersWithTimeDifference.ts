import { Transfer, TransferWithTimeDif } from '@app/api';
import { timeDifference } from '@app/utils';

export const transfersWithTimeDifference = (transfers: Transfer[] | undefined): (TransferWithTimeDif)[] => {
  if (!transfers || !Array.isArray(transfers)) {
    return [];
  }

  return transfers.map((transfer: Transfer) => ({
    ...transfer,
    time_difference: transfer.timestamp ? timeDifference(transfer.timestamp) : ''
  }));
};
