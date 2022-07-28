import React, { useCallback, useMemo, useState, VFC } from 'react';
import styled from 'styled-components';
import { DeviceSize2, useApi, useDeviceSize2 } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { Button, SelectOptionProps } from '@unique-nft/ui-kit';

import { PagePaperWrapper } from '@app/components';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import LoadingComponent from '@app/components/LoadingComponent';
import { tokens as gqlTokens } from '@app/api/graphQL';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
import { tokensOptions } from './tokensOptions';
import TokenCard from './TokenCard';

interface TokensProps {
  searchString?: string
  collectionId?: number
}

export const Tokens: VFC<TokensProps> = ({ collectionId, searchString }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(tokensOptions[0]);

  const deviceSize = useDeviceSize2();

  const tokensLimit = useMemo(() => {
    if (deviceSize === DeviceSize2.xxl) return 12;
    if (deviceSize === DeviceSize2.lg || deviceSize === DeviceSize2.xl) return 8;

    return 6;
  }, [deviceSize]);

  const onClick = useCallback(() => {
    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_NFTS_ON_MAIN_PAGE);
    navigate(`/${currentChain.network}/tokens`);
  }, [currentChain, navigate]);

  const { isTokensFetching, timestamp, tokens } = gqlTokens.useGraphQlTokens({
    filter: collectionId ? { collection_id: { _eq: Number(collectionId) } } : undefined,
    offset: 0,
    orderBy: { collection_id: 'desc', token_id: 'desc' },
    pageSize: tokensLimit,
    searchString
  });

  return (
    <Wrapper>
      <HeaderWithDropdown
        options={tokensOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        title='Tokens'
      />
      <TokensWrapper>
        {isTokensFetching && <LoadingComponent />}
        {tokens?.slice(0, tokensLimit).map((token) => (
          <TokenCard
            key={`token-${token.collection_id}-${token.token_id}`}
            {...token}
            timeNow={timestamp}
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
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;

const TokensWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: calc(var(--gap) * 1.5);
  grid-row-gap: calc(var(--gap) * 1.5);
  margin-bottom: calc(var(--gap) * 1.5);
  
  @media(min-width: 1680px) {
    grid-template-columns: repeat(6, 1fr);
  }  
  
  @media(max-width: 1679px) {
    grid-template-columns: repeat(4, 1fr);
  }

   @media(max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media(max-width: 575px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media(max-width: 479px) {
    grid-template-columns: 1fr;
  }
`;
