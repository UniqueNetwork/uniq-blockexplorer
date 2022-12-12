import { formatBlockNumber } from '@app/utils/textUtils';

const countDecimal = (num: number) => {
  const text = num.toString();
  const index = text.indexOf('.');

  return index === -1 ? 0 : text.length - index - 1;
};

export const formatLongNumber = (number = 0): string => {
  if (!number) return '0';

  if (number < 10000) return formatBlockNumber(number);

  if (number < 1000000) {
    return formatBlockNumber(Math.floor(number / 100) / 10) + 'K';
  }

  if (number < 1000000000) {
    return formatBlockNumber(Math.floor(number / 100000) / 10) + 'M';
  }

  return formatBlockNumber(Math.floor(number / 100000000) / 10) + 'B';
};
