import { Context, Consumer, Provider, createContext } from 'react';

export type TChainNetwork = 'QUARTZ' | 'UNIQUE' | 'KUSAMA' | 'POLKADOT' | 'OPAL';

export type Chain = {
  network: TChainNetwork;
  name: string;
  gqlEndpoint: string;
  rpcEndpoint: string;
  symbol: string;
}

export type ApiContextProps = {
  currentChain: Chain;
}

const ApiContext: Context<ApiContextProps> = createContext({} as unknown as ApiContextProps);
const ApiConsumer: Consumer<ApiContextProps> = ApiContext.Consumer;
const ApiProvider: Provider<ApiContextProps> = ApiContext.Provider;

export default ApiContext;

export { ApiConsumer, ApiProvider };
