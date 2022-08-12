const countDecimal = (num: number) => {
  const text = num.toString();
  const index = text.indexOf('.');

  return index === -1 ? 0 : text.length - index - 1;
};

export const formatLongNumber = (number = 0): string => {
  // over a million
  if (number >= 1000000) {
    return Math.floor(number / 1000000).toString() + ' M';
  }

  // truncate decimal if greater than 4
  if (countDecimal(number) > 3) {
    return number.toFixed(4).toString();
  }

  return number.toString();
};
