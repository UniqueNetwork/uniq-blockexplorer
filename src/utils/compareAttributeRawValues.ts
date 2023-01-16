import { EncodedTokenAttributeValue } from '@unique-nft/api';

export const compareAttributeRawValues = (
  rawValueA: EncodedTokenAttributeValue | string | Array<string>,
  rawValueB: string,
) => {
  if (typeof rawValueA === 'string') {
    return rawValueA === rawValueB;
  }

  if (typeof rawValueA === 'number') {
    return rawValueA.toString() === rawValueB;
  }

  return JSON.stringify(rawValueA) === rawValueB;
};
