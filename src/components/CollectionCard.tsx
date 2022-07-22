import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text, Heading } from '@unique-nft/ui-kit';
import { Collection } from '@app/api';
import { useApi } from '@app/hooks';
import { shortcutText } from '@app/utils';

import Avatar from './Avatar';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import { UserEvents } from '../analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

type CollectionCardProps = Collection

const CollectionCard: FC<CollectionCardProps> = ({
  collection_cover,
  collection_id: collectionId,
  name,
  owner,
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
      <CollectionCover>
        <Avatar
          size={'middle'}
          src={getCoverURLFromCollection(collection_cover)}
        />
      </CollectionCover>
      <CollectionInfo>
        <Heading size={'4'}>{name}</Heading>
        <CollectionProperties>
          <span>
            <Text
              color={'grey-500'}
              size={'s'}
            >ID:</Text>
            <Text size={'s'}>{collectionId.toString()}</Text>
          </span>
          <span>
            <Text
              color={'grey-500'}
              size={'s'}
            >Symbol:</Text>
            <Text size={'s'}>{tokenPrefix}</Text>
          </span>
          <span>
            <Text
              color={'grey-500'}
              size={'s'}
            >Items:</Text>
            <Text size={'s'}>{tokensCount?.toString() || '0'}</Text>
          </span>
        </CollectionProperties>
        <div>
          <Text
            color={'grey-500'}
            size={'s'}
          >Owner: </Text>
          <Text size={'s'}>{shortcutText(owner)}</Text>
        </div>
      </CollectionInfo>
    </CollectionCardLink>
  );
};

const CollectionCardLink = styled(Link)`
  background: var(--white-color);
  border: 1px solid #DFE0E2;
  border-radius: var(--bradius);
  box-sizing: border-box;
  padding: calc(var(--gap) * 1.5) calc(var(--gap) * 1.5);
  display: flex;
  column-gap: var(--gap);
  align-items: flex-start;
  &:hover {
    text-decoration: none;
  }
  
  h4 {
    overflow: hidden;
    word-break: break-word;
    max-height: 3rem;
    &:hover {
      color: var(--primary-500);
    }
  }
  
  @media (max-width: 767px) {
    border: none;
    padding: 0;
  }
`;

const CollectionCover = styled.div`
  min-width: 64px;
`;

const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 0;
`;

const CollectionProperties = styled.div`
  display: flex;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) / 4);
  span {
    display: flex;
    column-gap: calc(var(--gap) / 4);
  }
`;

export default CollectionCard;
