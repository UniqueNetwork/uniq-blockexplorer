import React, { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { defaultChainKey } from '@app/utils';

import { IGqlClient } from './graphQL/gqlClient';
import { ApiContextProps, ApiProvider } from './ApiContext';
import config from '../config';

import { gqlClient as gql } from '.';

interface ChainProviderProps {
  children: React.ReactNode
  gqlClient?: IGqlClient
}

const { chains, defaultChain } = config;

const ApiWrapper = ({ children, gqlClient = gql }: ChainProviderProps) => {
  const { chainId } = useParams<'chainId'>();
  const localChainId = useRef<string>();

  // get context value for ApiContext
  const value = useMemo<ApiContextProps>(
    () => ({
      currentChain: chainId ? chains[chainId] : defaultChain,
    }),
    [chainId]
  );

  // update endpoint if chainId is changed
  useEffect(() => {
    if (Object.values(chains).length === 0) {
      throw new Error('Networks is not configured');
    }

    if (chainId && localChainId.current !== chainId) {
      const currentChain = chains[chainId] ?? defaultChain;
      gqlClient.changeEndpoint(currentChain.gqlEndpoint);

      // set current chain id into localStorage
      localStorage.setItem(defaultChainKey, chainId);

      localChainId.current = chainId;
    }
  }, [chainId, gqlClient]);

  return (
    <ApiProvider value={value}>
      <ApolloProvider client={gqlClient.client}>{children}</ApolloProvider>
    </ApiProvider>
  );
};

export default ApiWrapper;
