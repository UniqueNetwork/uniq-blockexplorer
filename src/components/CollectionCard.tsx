import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text, Heading } from '@unique-nft/ui-kit';

import Avatar from './Avatar';
import { Collection } from '../api/graphQL';
import config from '../config';
import { useApi } from '../hooks/useApi';
import { shortcutText } from '../utils/textUtils';

const { IPFSGateway } = config;

type CollectionCardProps = Collection

const CollectionCard: FC<CollectionCardProps> = ({
  collection_cover: cover,
  collection_id: collectionId,
  name,
  owner,
  token_prefix: tokenPrefix,
  tokens_aggregate: tokensAggregate
}) => {
  const { currentChain } = useApi();

  const tokensCount = tokensAggregate?.aggregate.count || 0;

  return (
    <CollectionCardLink
      to={`/${currentChain.network}/collections/${collectionId}`}
    >
      <CollectionCover>
        <Avatar
          size={'middle'}
          src={cover ? `${IPFSGateway || ''}/${cover}` : undefined}
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
            >Prefix:</Text>
            <Text size={'s'}>{tokenPrefix}</Text>
          </span>
          <span>
            <Text
              color={'grey-500'}
              size={'s'}
            >Items:</Text>
            <Text size={'s'}>{tokensCount.toString()}</Text>
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
  box-sizing: border-box;
  border-radius: 4px;
  padding: calc(var(--gap) * 1.5) calc(var(--gap) * 1.5);
  display: flex;
  column-gap: var(--gap);
  align-items: flex-start;
  margin-bottom: var(--gap);
  grid-column: span 4;
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
