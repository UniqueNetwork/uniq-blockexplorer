import { LastBlock, LastBlockWithTimeDif } from '@app/api';
import { timeDifference } from '@app/utils';

export const blocksWithTimeDifference = (
  blocks: LastBlock[] | undefined,
  timestamp?: number
): LastBlockWithTimeDif[] => {
  if (!blocks || !Array.isArray(blocks)) {
    return [];
  }

  return blocks.map((block: LastBlock) => ({
    ...block,
    time_difference: timeDifference(block.timestamp, timestamp)
  }));
};
