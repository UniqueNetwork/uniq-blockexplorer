import { LastBlock } from '@app/api';
import { timeDifference } from '@app/utils';

export const blocksWithTimeDifference = (
  blocks: LastBlock[] | undefined
): (LastBlock & { time_difference: string })[] => {
  if (!blocks || !Array.isArray(blocks)) return [];

  return blocks.map((block: LastBlock) => ({
    ...block,
    time_difference: timeDifference(block.timestamp)
  }));
};
