import { ApiPromise } from '@polkadot/api';
import { Context, Consumer, Provider, createContext } from 'react';
import { Chain, INFTController, IRpcClient } from './chainApi/types';

export type ChainData = {
  properties: {
    tokenSymbol: string
  }
  systemChain: string
  systemName: string
}

export type ApiContextProps = {
  rpcClient: IRpcClient
  rawRpcApi?: ApiPromise
  api?: INFTController
  chainData?: ChainData
  currentChain: Chain
}

const ApiContext: Context<ApiContextProps> = createContext({} as unknown as ApiContextProps);
const ApiConsumer: Consumer<ApiContextProps> = ApiContext.Consumer;
const ApiProvider: Provider<ApiContextProps> = ApiContext.Provider;

export default ApiContext;

export { ApiConsumer, ApiProvider };
