import React, { VFC, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text, Heading, Icon } from '@unique-nft/ui-kit';

import { Collection } from '@app/api';
import { useApi } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

// TODO - move fingerPrint and clock icon to the UI kit - fix bug with colors
import fingerPrint from '@app/images/icons/fingerPrint.svg';
import clock from '@app/images/icons/clock.svg';

import { CollectionCover } from '../CollectionCover';

type CollectionCardProps = Collection;

export const CollectionCard: VFC<CollectionCardProps> = ({
  collection_cover,
  collection_id: collectionId,
  name,
  token_prefix: tokenPrefix,
  tokens_count: tokensCount
}) => {
  const { currentChain } = useApi();

  const onCollectionsCardClick = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('account')) {
      logUserEvents(UserEvents.Click.ON_COLLECTIONS_CARD_FROM_ACCOUNT_PAGE);
    }
  }, []);

  return (
    <CollectionCardLink
      onClick={onCollectionsCardClick}
      to={`/${currentChain.network}/collections/${collectionId}`}
    >
      <CollectionCover
        coverSrc={collection_cover}
      />
      <CollectionInfo>
        <Heading size='4'>{name}</Heading>
        <CollectionProperties>
          <span>
            <img
              alt='collection id'
              src={fingerPrint}
            />
            <Text size='s'>{collectionId.toString()}</Text>
          </span>
          <span>
            <Icon
              name='empty-image'
              size={13}
            />
            <Text size={'s'}>{tokenPrefix}</Text>
          </span>
          <span>
            <img
              alt='created'
              src={clock}
            />
            <Text size='s'>{tokensCount?.toString() || '0'}</Text>
          </span>
        </CollectionProperties>
      </CollectionInfo>
    </CollectionCardLink>
  );
};

const CollectionCardLink = styled(Link)`
  background: var(--white-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--gap);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  column-gap: var(--gap);
  height: 220px;

  &:hover {
    text-decoration: none;
  }

  .unique-font-heading.size-4 {
    overflow: hidden;
    word-break: break-word;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    
    &:hover {
      color: var(--primary-500);
    }
  }
  
  @media (max-width: 767px) {
    border: none;
    padding: 0;
  }
`;

const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0;
  padding: calc(var(--gap) * 1.5);
  padding-top: 48px;
`;

const CollectionProperties = styled.div`
  display: flex;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) / 4);
  
  span {
    display: flex;
    column-gap: calc(var(--gap) / 4);
    align-items: center;
    justify-content: center;
  }
  
  img {
    width: 13px;
  }
`;
