import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { defaultChainKey } from '@app/utils';

import { IGqlClient } from './graphQL/gqlClient';
import { IRpcClient } from './chainApi/types';
import { ApiContextProps, ApiProvider, ChainData } from './ApiContext';
import config from '../config';

import { gqlClient as gql, rpcClient as rpc } from '.';

interface ChainProviderProps {
  children: React.ReactNode
  gqlClient?: IGqlClient
  rpcClient?: IRpcClient
}

const { chains, defaultChain } = config;

const ApiWrapper = ({ children, gqlClient = gql, rpcClient = rpc }: ChainProviderProps) => {
  const [chainData, setChainData] = useState<ChainData>();
  const [isLoadingChainData, setIsLoadingChainData] = useState<boolean>(true);
  const { chainId } = useParams<'chainId'>();
  const localChainId = useRef<string>();

  // get context value for ApiContext
  const value = useMemo<ApiContextProps>(
    () => ({
      api: rpcClient?.controller,
      chainData,
      currentChain: chainId ? chains[chainId] : defaultChain,
      isLoadingChainData,
      rawRpcApi: rpcClient.rawRpcApi,
      rpcClient
    }),
    [rpcClient, chainData, chainId, isLoadingChainData]
  );

  useEffect(() => {
    rpcClient?.setOnChainReadyListener((_chainData) => {
      setIsLoadingChainData(false);
      setChainData(_chainData);
    });
  }, [rpcClient]);

  // update endpoint if chainId is changed
  useEffect(() => {
    if (Object.values(chains).length === 0) {
      throw new Error('Networks is not configured');
    }

    if (localChainId.current && chainId && localChainId.current !== chainId) {
      const currentChain = chains[chainId] ?? defaultChain;

      setIsLoadingChainData(true);
      gqlClient.changeEndpoint(currentChain.gqlEndpoint);
      rpcClient.changeEndpoint(currentChain.rpcEndpoint);

      // set current chain id into localStorage
      localStorage.setItem(defaultChainKey, chainId);
    }
  }, [chainId, rpcClient, gqlClient, setIsLoadingChainData]);

  useEffect(() => {
    localChainId.current = chainId;
  }, [chainId]);

  return (
    <ApiProvider value={value}>
      <ApolloProvider client={gqlClient.client}>{children}</ApolloProvider>
    </ApiProvider>
  );
};

export default ApiWrapper;
