import { Chain } from './api/ApiContext';
import { getChainList, getDefaultChain } from './utils/configParser';

declare type Env = {
  REACT_APP_NET_DEFAULT: string | undefined;
  REACT_APP_IPFS_GATEWAY: string | undefined;
  REACT_APP_GTM_EXISTS: string | undefined;
} & Record<string, string | undefined>;

declare type Config = {
  IPFSGateway: string | undefined;
  chains: Record<string, Chain>;
  defaultChain: Chain;
  GTMExists: string | undefined;
};

declare global {
  interface Window {
    ENV: Env;
  }
}

const chains = getChainList(window.ENV || process.env);

const config: Config = {
  GTMExists: window.ENV?.REACT_APP_GTM_EXISTS || process.env.REACT_APP_GTM_EXISTS,
  IPFSGateway: window.ENV?.IPFS_GATEWAY || process.env.REACT_APP_IPFS_GATEWAY,
  chains,
  defaultChain: chains[getDefaultChain(window.ENV || process.env)],
};

export default config;
