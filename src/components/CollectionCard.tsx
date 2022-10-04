import { VFC, useCallback } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Text, Heading } from '@unique-nft/ui-kit';

import { Collection } from '@app/api';
import { useApi } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { timeDifference } from '@app/utils';
import { SVGIcon } from '@app/components/SVGIcon';

import { CollectionCover } from './CollectionCover';

interface CollectionCardProps extends Collection {
  timestamp?: number;
}

export const CollectionCard: VFC<CollectionCardProps> = ({
  collection_cover,
  collection_id: collectionId,
  date_of_creation,
  name,
  timestamp,
  tokens_count: tokensCount,
}) => {
  const { currentChain } = useApi();
  const createdTimeDiff = timeDifference(date_of_creation, timestamp);

  const onCollectionsCardClick = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('account')) {
      logUserEvents(UserEvents.Click.ON_COLLECTIONS_CARD_FROM_ACCOUNT_PAGE);
    }
  }, []);

  return (
    <CollectionCardLink
      to={`/${currentChain.network.toLowerCase()}/collections/${collectionId}`}
      onClick={onCollectionsCardClick}
    >
      <CollectionCover
        collectionId={collectionId}
        collectionName={name}
        coverSrc={collection_cover}
      />
      <CollectionInfo>
        <CollectionNameWrapper>
          <Heading size="4">{name}</Heading>
        </CollectionNameWrapper>
        <CollectionProperties>
          <span>
            <IconText>ID</IconText>
            <Text size="s" weight="light">
              {collectionId.toString()}
            </Text>
          </span>
          <span>
            <StyledSVGIcon height={16} name="emptyImage" width={16} />
            <Text size="s" weight="light">
              {tokensCount}
            </Text>
          </span>
          <span>
            <StyledSVGIcon height={16} name="clock" width={16} />
            <Text size="s" weight="light">
              {createdTimeDiff}
            </Text>
          </span>
        </CollectionProperties>
      </CollectionInfo>
    </CollectionCardLink>
  );
};

const StyledSVGIcon = styled(SVGIcon)`
  color: var(--blue-gray-400);
`;

const CollectionNameWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CollectionCardLink = styled(Link)`
  background: var(--white-color);
  border: 1px solid var(--grey-200);
  border-radius: var(--gap);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  column-gap: var(--gap);

  &:hover {
    transform: translate(0, -5px);
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
`;

const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0;
  width: calc(100% - (var(--gap) * 3));
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
`;

const IconText = styled.div`
  color: var(--blue-gray-400);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`;
