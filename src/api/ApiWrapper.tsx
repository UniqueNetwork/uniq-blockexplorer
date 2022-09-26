import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { defaultChainKey } from '@app/utils';
import { getApolloClient } from '@app/api/graphQL/apolloClient';

import { ApiContextProps, ApiProvider } from './ApiContext';
import config from '../config';

interface ChainProviderProps {
  children: React.ReactNode;
}

const { chains, defaultChain } = config;

const ApiWrapper = ({ children }: ChainProviderProps) => {
  const { chainId } = useParams<'chainId'>();

  // get context value for ApiContext
  const value = useMemo<ApiContextProps>(
    () => ({
      currentChain: chainId ? chains[chainId.toUpperCase()] : defaultChain,
    }),
    [chainId],
  );

  const client = useMemo(() => {
    const currentChain = chainId ? chains[chainId.toUpperCase()] : defaultChain;

    return getApolloClient(currentChain.gqlEndpoint);
  }, [chainId]);

  useEffect(() => {
    localStorage.setItem(defaultChainKey, chainId?.toUpperCase() || defaultChain.network);
  }, [chainId]);

  return (
    <ApiProvider value={value}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApiProvider>
  );
};

export default ApiWrapper;
