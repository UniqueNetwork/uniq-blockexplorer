import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { Button, Text } from '@unique-nft/ui-kit';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { LoadingComponent, Stub } from '@app/components';
import { useGraphQlBundles } from '@app/api';
import BundleCard from '@app/components/BundleCard';
import { useApi } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { defaultSorting } from '@app/pages/Tokens/constants';

type BundlesTabProps = {
  pageSize?: number;
  collectionId?: string;
  tokensLimit: number;
};

const BundlesTab = ({ collectionId, pageSize = 16, tokensLimit }: BundlesTabProps) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const { bundles, bundlesCount, isBundlesFetching, timestamp } = useGraphQlBundles({
    filter: {
      collection_id: { _eq: Number(collectionId) },
      burned: { _eq: 'false' },
    },
    pageSize,
    offset: 0,
  });

  const onButtonClick = useCallback(() => {
    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_NFTS_ON_COLLECTION_PAGE); // TODO add correct event
    let params: { sort?: string; collectionId?: string } = {};
    params.sort = defaultSorting;

    if (collectionId) {
      params.collectionId = collectionId;
    }

    navigate({
      pathname: `/${currentChain.network.toLowerCase()}/bundles/`,
      search: `?${createSearchParams(params)}`,
    });
  }, [currentChain, navigate, collectionId]);

  if (!bundlesCount)
    return (
      <NoDataWrapper>
        <Stub />
      </NoDataWrapper>
    );

  return (
    <>
      {bundlesCount && (
        <ItemsCount size={'m'}>{`${bundlesCount} bundle${
          bundlesCount > 1 ? 's' : ''
        }`}</ItemsCount>
      )}
      <TokensWrapper>
        {isBundlesFetching && <LoadingComponent />}
        {bundles?.slice(0, tokensLimit).map((token) => (
          <BundleCard
            key={`token-${token.collection_id}-${token.token_id}`}
            timeNow={timestamp}
            hideCollection={true}
            hideCreationTime={true}
            {...token}
          />
        ))}
      </TokensWrapper>
      {bundlesCount !== 0 && (
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

export default BundlesTab;
