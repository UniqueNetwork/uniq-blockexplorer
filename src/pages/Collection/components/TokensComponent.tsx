import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, Text } from '@unique-nft/ui-kit';

import { tokens as gqlTokens } from '@app/api';
import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { LoadingComponent, TokenCard } from '@app/components';

interface TokensComponentProps {
  searchString?: string
  pageSize?: number
  collectionId?: string
}

const TokensComponent: FC<TokensComponentProps> = ({ collectionId, pageSize = 16 }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const deviceSize = useDeviceSize();

  const { isTokensFetching, tokens, tokensCount } = gqlTokens.useGraphQlTokens({
    filter: collectionId ? { collection_id: { _eq: collectionId } } : undefined,
    offset: 0,
    pageSize
  });

  const tokensLimit = useMemo(() => {
    if (deviceSize === DeviceSize.xs || deviceSize === DeviceSize.xxs) return 10;
    if (deviceSize === DeviceSize.sm) return 12;
    if (deviceSize === DeviceSize.lg || deviceSize === DeviceSize.md) return 16;

    return 10;
  }, [deviceSize]);

  const onClick = useCallback(() => {
    navigate(`/${currentChain.network}/tokens/${collectionId || ''}`);
  }, [currentChain, navigate, collectionId]);

  return (
    <>
      <TokenHeadingWrapper>
        <Heading size={'2'}>NFTs</Heading>
        <Text>{`${tokensCount} items`}</Text>
      </TokenHeadingWrapper>
      <TokensWrapper>
        {isTokensFetching && <LoadingComponent />}
        {tokens?.slice(0, tokensLimit).map((token) => (
          <TokenCard
            key={`token-${token.collection_id}-${token.token_id}`}
            {...token}
          />
        ))}
      </TokensWrapper>
      {tokensCount !== 0 && <Button
        iconRight={{
          color: 'white',
          name: 'arrow-right',
          size: 10
        }}
        onClick={onClick}
        role={'primary'}
        title={'See all'}
      />}
    </>
  );
};

const TokensWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: calc(var(--gap) * 1.5);
  grid-row-gap: calc(var(--gap) * 1.5);
  margin-bottom: calc(var(--gap) * 1.5);
  
  @media(max-width: 1439px) {
    grid-template-columns: repeat(4, 1fr);
  }  
  
  @media(max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media(max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media(max-width: 567px) {
    grid-template-columns: 1fr;
  }
`;

const TokenHeadingWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: baseline;
`;

export default TokensComponent;
