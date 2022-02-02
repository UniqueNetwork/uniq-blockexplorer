import React, { FC } from 'react';
import Avatar from './Avatar';
import { Collection } from '../api/graphQL';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  return (
    <CollectionLink
      to={`/${chainId}/collections/${collectionId}`}
    >
      <Avatar
        size={'small'}
        src={coverImageUrl}
      />
      <CollectionTitle>
        <Text color={'secondary-500'}>{collectionName}</Text>
        <Text size={'xs'} color={'grey-500'}>{`ID ${collectionId}`}</Text>
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
  &:hover {
    text-decoration: none;
    .unique-text[class*=size-m] {
      color: var(--primary-500) !important;  
    }
  }
`;

export default CollectionTableCell;
