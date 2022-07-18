import { Chain, TChainNetwork } from '@app/api/ApiContext';

const configKeyRegexp = /NET_(?<network>[A-Z]+)_NAME$/gm;

export const defaultChainKey = 'block-explorer_chain';

const findNetworkParamByName = (
  config: Record<string, string | undefined>,
  network: string,
  name: string
): string => {
  const envKey = Object.keys(config).find((key) => key.includes(`NET_${network}_${name}`));

  if (envKey) return config[envKey] || '';

  return '';
};

export const getNetworkList = (config: Record<string, string | undefined>): TChainNetwork[] => {
  return Object.keys(config).reduce<TChainNetwork[]>((acc, key) => {
    if (!key.includes('NET_') || key.includes('NET_DEFAULT')) return acc;

    const { network } = configKeyRegexp.exec(key)?.groups || {};

    if (network) {
      acc.push(network as TChainNetwork);
    }

    return acc;
  }, []);
};

// todo - fix me, we should get chain from url first
export const getDefaultChain = (config: Record<string, string | undefined>) => {
  const storedChain = localStorage.getItem(defaultChainKey);
  const networkList = getNetworkList(config);

  // make sure that we are trying to use an config-existing chain, otherwise go with default one
  if (storedChain) {
    const isExist = !!networkList.find((network) => network === storedChain);

    if (isExist) {
      return storedChain;
    }
  }

  const newChain = config.REACT_APP_NET_DEFAULT || getNetworkList(config)[0];

  localStorage.setItem(defaultChainKey, newChain);

  return newChain;
};

export const getNetworkParams = (
  config: Record<string, string | undefined>,
  network: TChainNetwork
): Chain => {
  const chain: Chain = {
    gqlEndpoint: findNetworkParamByName(config, network, 'API'),
    name: findNetworkParamByName(config, network, 'NAME'),
    network,
    rpcEndpoint: findNetworkParamByName(config, network, 'RPC')
  };

  return chain;
};

export const getChainList = (config: Record<string, string | undefined>): Record<string, Chain> => {
  return getNetworkList(config).reduce<Record<string, Chain>>((acc, network) => {
    acc[network] = getNetworkParams(config, network);

    return acc;
  }, {});
};
