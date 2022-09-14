import { timeDifference } from '@app/utils';

export type WithTimestamp = {
  timestamp: number | null;
};

export type TimeDifference = {
  time_difference: string;
};

export function transfersWithTimeDifference<T extends WithTimestamp>(
  items: T[] | undefined,
  timestamp?: number,
): (T & TimeDifference)[] {
  if (!items || !Array.isArray(items)) {
    return [];
  }

  return items.map((item: T) => ({
    ...item,
    time_difference: item.timestamp ? timeDifference(item.timestamp, timestamp) : '',
  }));
}
