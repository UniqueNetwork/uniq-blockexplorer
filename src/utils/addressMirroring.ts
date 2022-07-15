import { TChainNetwork } from '@app/api/ApiContext';
import { encodeAddress, blake2AsHex } from '@polkadot/util-crypto';
import { Buffer } from 'buffer';

export type TAddressFormat = TChainNetwork | 'normalized';

export function getMirrorFromEthersToSubstrate(h160Addr: string, format: TAddressFormat) {
  validateH160(h160Addr);
  const getPrefixForFormat: { [key in TAddressFormat]: number } = {
    KUSAMA: 2,
    OPAL: 42,
    POLKADOT: 0,
    QUARTZ: 255,
    UNIQUE: 7391,
    normalized: 42
  };
  const prefix = getPrefixForFormat[format];
  const addressBytes = Buffer.from(h160Addr.slice(2), 'hex');
  const prefixBytes = Buffer.from('evm:');
  const convertBytes = Uint8Array.from(Buffer.concat([prefixBytes, addressBytes]));
  const finalAddressHex = blake2AsHex(convertBytes, 256);

  return encodeAddress(finalAddressHex, prefix);
}

export function validateH160(h160Addr: string) {
  const re = /0x[0-9A-Fa-f]{40}/g;

  if (!re.test(h160Addr)) {
    // eslint-disable-next-line no-throw-literal
    throw 'Invalid H160 address provided!';
  }
}
