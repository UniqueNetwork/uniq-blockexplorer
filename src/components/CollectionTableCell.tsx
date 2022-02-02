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
        <Text color={'black'}>{collectionName}</Text>
        <Text color={'grey-500'}>{`ID ${collectionId}`}</Text>
      </CollectionTitle>
    </CollectionLink>
  );
};

const CollectionLink = styled(Link)`
  display: flex;
  column-gap: var(--gap);
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
  color: black !important;
`;

export default CollectionTableCell;
