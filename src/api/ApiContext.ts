import { ApiPromise } from '@polkadot/api';
import { Context, Consumer, Provider, createContext } from 'react';

export type ChainData = {
  properties: {
    tokenSymbol: string;
  }
  systemChain: string;
  systemName: string;
}

export type Chain = {
  network: string;
  name: string;
  gqlEndpoint: string;
  rpcEndpoint: string;
}

export type ApiContextProps = {
  rawRpcApi?: ApiPromise;
  chainData?: ChainData;
  currentChain: Chain;
  isLoadingChainData: boolean;
}

const ApiContext: Context<ApiContextProps> = createContext({} as unknown as ApiContextProps);
const ApiConsumer: Consumer<ApiContextProps> = ApiContext.Consumer;
const ApiProvider: Provider<ApiContextProps> = ApiContext.Provider;

export default ApiContext;

export { ApiConsumer, ApiProvider };
