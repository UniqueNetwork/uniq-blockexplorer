import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

export const normalizeSubstrate = (account: string) =>
  encodeAddress(decodeAddress(account));
