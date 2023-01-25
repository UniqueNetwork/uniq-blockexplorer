import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components/macro';
import { Button, Text } from '@unique-nft/ui-kit';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { LoadingComponent, Stub, TokenCard } from '@app/components';
import { TokenTypeEnum, useGraphQlTokens } from '@app/api';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { defaultSorting } from '@app/pages/Tokens/constants';
import { useApi } from '@app/hooks';
import { useGraphQLTokensTotalHolders } from '@app/api/graphQL/rftTotalHolders/rftTotalHolders';

type TokensTabProps = {
  pageSize?: number;
  collectionId?: string;
  tokensLimit: number;
};

const RFTsComponent = ({ collectionId, pageSize = 16, tokensLimit }: TokensTabProps) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const { isTokensFetching, timestamp, tokens, tokensCount } = useGraphQlTokens({
    filter: collectionId
      ? { collection_id: { _eq: Number(collectionId) }, burned: { _eq: 'false' } }
      : { burned: { _eq: 'false' } },
    offset: 0,
    pageSize,
  });

  const { tokensHolders, isTokensTotalHoldersFetching } = useGraphQLTokensTotalHolders({
    tokens:
      tokens?.map(({ collection_id, token_id }) => ({ collection_id, token_id })) || [],
  });

  const onButtonClick = useCallback(() => {
    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_NFTS_ON_COLLECTION_PAGE);
    let params: { sort?: string; collectionId?: string } = {};
    params.sort = defaultSorting;

    if (collectionId) {
      params.collectionId = collectionId;
    }

    navigate({
      pathname: `/${currentChain.network.toLowerCase()}/tokens/nfts/`,
      search: `?${createSearchParams(params)}`,
    });
  }, [currentChain, navigate, collectionId]);

  const tokensWithOwners = useMemo(
    () =>
      tokens?.slice(0, tokensLimit).map((token) => ({
        ...token,
        ownersCount: tokensHolders[`${token.collection_id}_${token.token_id}`] || 0,
      })) || [],
    [tokens, tokensHolders],
  );

  if (!tokensCount)
    return (
      <NoDataWrapper>
        <Stub />
      </NoDataWrapper>
    );

  return (
    <>
      {tokensCount && (
        <ItemsCount size={'m'}>{`${tokensCount} token${
          tokensCount > 1 ? 's' : ''
        }`}</ItemsCount>
      )}
      <TokensWrapper>
        {(isTokensFetching || isTokensTotalHoldersFetching) && <LoadingComponent />}
        {tokensWithOwners.map((token) => (
          <TokenCard
            key={`token-${token.collection_id}-${token.token_id}`}
            timeNow={timestamp}
            hideCollection={true}
            hideCreationTime={true}
            hideOwner={token.type === TokenTypeEnum.RFT}
            {...token}
          />
        ))}
      </TokensWrapper>
      {tokensCount !== 0 && (
        <Button
          iconRight={{
            color: 'white',
            name: 'arrow-right',
            size: 10,
          }}
          role={'primary'}
          title={'See all'}
          onClick={onButtonClick}
        />
      )}
    </>
  );
};

const NoDataWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ItemsCount = styled(Text)`
  display: block !important;
  margin-bottom: calc(var(--gap) * 2);
`;

const TokensWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: calc(var(--gap) * 1.5);
  grid-row-gap: calc(var(--gap) * 1.5);
  margin-bottom: calc(var(--gap) * 1.5);

  @media (max-width: 1439px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 567px) {
    grid-template-columns: 1fr;
  }
`;

export default RFTsComponent;
