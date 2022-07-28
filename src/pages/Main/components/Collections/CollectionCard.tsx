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
import { timeDifference } from '@app/utils';

interface CollectionCardProps extends Collection {
  timestamp: number;
}

export const CollectionCard: VFC<CollectionCardProps> = ({
  collection_cover,
  collection_id: collectionId,
  date_of_creation,
  name,
  timestamp,
  token_prefix: tokenPrefix,
  tokens_count: tokensCount
}) => {
  const { currentChain } = useApi();
  const createdTimeDiff = timeDifference(timestamp, date_of_creation);

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
            <Text
              size='s'
              weight='light'
            >
              {collectionId.toString()}
            </Text>
          </span>
          <span>
            <Icon
              name='empty-image'
              size={13}
            />
            <Text
              size='s'
              weight='light'
            >
              {tokenPrefix}
            </Text>
          </span>
          <span>
            <img
              alt='created'
              src={clock}
            />
            <Text
              size='s'
              weight='light'
            >
              {createdTimeDiff}
            </Text>
          </span>
        </CollectionProperties>
      </CollectionInfo>
    </CollectionCardLink>
  );
};

const CollectionCardLink = styled(Link)`
  background: var(--white-color);
  border: 1px solid var(--grey-200);
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

  @media (min-width: 1200px) and (max-width: 1679px) {
    height: 246px;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    height: 220px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    height: 246px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    height: 190px;
  }

  @media (max-width: 575px) {
    height: 190px;
  }
`;

const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0;
  padding: calc(var(--gap) * 1.5);
  padding-top: 48px;

  @media (max-width: 767px) {
    padding: var(--gap);
    padding-top: 32px;
  }
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

  @media (min-width: 1200px) and (max-width: 1679px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    span {
      &:last-child {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    display: flex;
  }

  @media (max-width: 991px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    span {
      &:last-child {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  }

  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`;
