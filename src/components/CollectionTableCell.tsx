import React, { FC, useCallback } from 'react';
import Avatar from './Avatar';
import { Collection } from '../api/graphQL';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import amplitude from 'amplitude-js';
import { UserEvents } from '@app/analytics/user_analytics';

interface CollectionTableCellProps {
  chainId: string
  collectionId: string
  coverImageUrl?: string
  collectionName: string
}

const CollectionTableCell: FC<CollectionTableCellProps> = ({
  chainId,
  collectionId,
  collectionName,
  coverImageUrl
}) => {
  const onCollectionClick = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('collections')) {
      amplitude.getInstance().logEvent(UserEvents.Click.ON_COLLECTION_IN_TABLE_ON_COLLECTIONS_PAGE);
    }
  }, []);

  return (
    <CollectionLink
      onClick={onCollectionClick}
      to={`/${chainId}/collections/${collectionId}`}
    >
      <Avatar
        size={'small'}
        src={coverImageUrl}
      />
      <CollectionTitle>
        <Text color={'secondary-500'}>{collectionName}</Text>
        <Text
          color={'grey-500'}
          size={'xs'}
        >{`ID ${collectionId}`}</Text>
      </CollectionTitle>
    </CollectionLink>
  );
};

const CollectionLink = styled(Link)`
  display: flex;
  column-gap: calc(var(--gap) / 2);
  svg {
    min-width: 40px;
  }
  &:hover {
    text-decoration: none;
  }
`;

const CollectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  span {
    word-break: break-word;
  }
  &:hover {
    text-decoration: none;
    .unique-text[class*=size-m] {
      color: var(--primary-500) !important;  
    }
  }
`;

export default CollectionTableCell;
