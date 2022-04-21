import { ChainData } from '../ApiContext';
import { ApiPromise } from '@polkadot/api';
import { Codec } from '@polkadot/types/types';

export interface IRpcClient {
  isApiConnected: boolean;
  isApiInitialized: boolean;
  controller?: INFTController;
  chainData?: ChainData;
  rawRpcApi?: ApiPromise; // allow access to the raw API for exceptions in the future
  setOnChainReadyListener(callback: (chainData: ChainData) => void): void;
  changeEndpoint(endpoint: string, options?: IRpcClientOptions): void;
}

export interface IRpcClientOptions {
  onChainReady?: (chainData: ChainData) => void
}

export interface INFTController<Collection = unknown, Token = unknown> {
  chainAddressFormat(address: string): string | undefined;
  getCollection(collectionId: number): Promise<Collection | null>
  getToken(collectionId: number, tokenId: number): Promise<Token | null>
  getTokensOfCollection(collectionId: number, ownerId: number): Promise<Codec | Token[]>
}

export type Chain = {
  network: string
  name: string
  gqlEndpoint: string
  rpcEndpoint: string
}
