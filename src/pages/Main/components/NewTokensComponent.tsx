import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '@unique-nft/ui-kit';

import { tokens as gqlTokens } from '@app/api/graphQL';
import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { LoadingComponent, TokenCard } from '@app/components';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

interface NewTokensComponentProps {
  searchString?: string
  pageSize?: number
  collectionId?: number
}

const NewTokensComponent: FC<NewTokensComponentProps> = ({ collectionId, pageSize = 6, searchString }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const deviceSize = useDeviceSize();

  const tokensLimit = useMemo(() => {
    if (deviceSize === DeviceSize.sm || deviceSize === DeviceSize.xs || deviceSize === DeviceSize.xxs) return 6;
    if (deviceSize === DeviceSize.lg || deviceSize === DeviceSize.md) return 4;

    return 5;
  }, [deviceSize]);

  const onClick = useCallback(() => {
    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_NFTS_ON_MAIN_PAGE);
    navigate(`/${currentChain.network}/tokens`);
  }, [currentChain, navigate]);

  const { isTokensFetching, tokens } = gqlTokens.useGraphQlTokens({
    filter: collectionId ? { collection_id: { _eq: Number(collectionId) } } : undefined,
    offset: 0,
    orderBy: { collection_id: 'desc', token_id: 'desc' },
    pageSize,
    searchString
  });

  return (
    <>
      <TokensWrapper>
        {isTokensFetching && <LoadingComponent />}
        {tokens?.slice(0, tokensLimit).map((token) => (
          <TokenCard
            key={`token-${token.collection_id}-${token.token_id}`}
            {...token}
          />
        ))}
      </TokensWrapper>
      <Button
        iconRight={{
          color: 'white',
          name: 'arrow-right',
          size: 10
        }}
        onClick={onClick}
        role={'primary'}
        title={'See all'}
      />
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

export default NewTokensComponent;
