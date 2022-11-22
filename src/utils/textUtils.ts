export const shortcutText = (text: string) => {
  // Cut it to the first and last 5 symbols
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, start, end] = /^(.{5}).*(.{5})$/.exec(text) || [];

  return start && end ? `${start}...${end}` : text;
};

export const formatAmount = (amount: number | string) => {
  if (!amount) return '0';

  const parts = amount.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
};

export const formatBlockNumber = (blockNumber: number | undefined) => {
  if (!blockNumber) return '';

  return blockNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formatFeeValue = (amount: number): string => {
  if (!amount) return '0';

  const parts = amount.toString().split('.');

  if (!parts[1] || parts[1].length < 5) return parts.join('.');

  const floatParts = parts[1].split('');

  if (parseInt(floatParts[4]) >= 5)
    floatParts[3] = (parseInt(floatParts[3]) + 1).toString();

  parts[1] = floatParts.join('').slice(0, 4);

  return parts.join('.');
};
