import { Transfer } from '@app/api';
import { timeDifference } from '@app/utils';

export const transfersWithTimeDifference = (transfers: Transfer[] | undefined): (Transfer & { time_difference: string })[] => {
  if (!transfers || !Array.isArray(transfers)) {
    return [];
  }

  return transfers.map((transfer: Transfer) => ({
    ...transfer,
    time_difference: transfer.timestamp ? timeDifference(transfer.timestamp) : ''
  }));
};
