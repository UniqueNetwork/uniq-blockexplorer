import { encodeAddress, decodeAddress, blake2AsHex } from '@polkadot/util-crypto';
import { Buffer } from 'buffer';

export type TAddressFormat = 'quartz' | 'normalized' | 'unique' | 'kusama' | 'polkadot';

export function getMirrorFromEthersToSubstrate(h160Addr: string, format: TAddressFormat) {
  validateH160(h160Addr);
  const getPrefixForFormat: { [key in TAddressFormat]: number } = {
    kusama: 2,
    normalized: 42,
    polkadot: 0,
    quartz: 255,
    unique: 7391
  };
  const prefix = getPrefixForFormat[format];
  const addressBytes = Buffer.from(h160Addr.slice(2), 'hex');
  const prefixBytes = Buffer.from('evm:');
  const convertBytes = Uint8Array.from(Buffer.concat([prefixBytes, addressBytes]));
  const finalAddressHex = blake2AsHex(convertBytes, 256);

  return encodeAddress(finalAddressHex, prefix);
}

export function getMirrorFromSubstrateNormalizedToEthers(ss58Addr: string) {
  validateSs58(ss58Addr);

  const pubKey = Buffer.from(decodeAddress(ss58Addr)).toString('hex');

  return '0x' + pubKey.slice(0, 40);
}

export function validateH160(h160Addr: string) {
  const re = /0x[0-9A-Fa-f]{40}/g;

  if (!re.test(h160Addr)) {
    // eslint-disable-next-line no-throw-literal
    throw 'Invalid H160 address provided!';
  }
}

export function validateSs58(ss58Addr: string) {
  if (ss58Addr.length !== 48 || ss58Addr.at(0) !== '5') {
    // eslint-disable-next-line no-throw-literal
    throw 'Invalid SS58 address provided!';
  }
}
