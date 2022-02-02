import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import Avatar from './Avatar';
import AccountLinkComponent from '../pages/Account/components/AccountLinkComponent';
import { Collection } from '../api/graphQL';
import config from '../config';
import { useApi } from '../hooks/useApi';

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
          size={'small'}
          src={cover ? `${IPFSGateway || ''}/${cover}` : undefined}
        />
      </CollectionCover>
      <CollectionInfo>
        <Text>{name}</Text>
        <CollectionProperties>
          <span>
            <Text color={'grey-500'}>ID:</Text>
            {collectionId}
          </span>
          <span>
            <Text color={'grey-500'}>Prefix:</Text>
            {tokenPrefix}
          </span>
          <span>
            <Text color={'grey-500'}>Items:</Text>
            {tokensCount}
          </span>
        </CollectionProperties>
        <div>
          <Text color={'grey-500'}>Owner: </Text>
          <AccountLinkComponent value={owner} />
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
  padding: calc(var(--gap) * 1.5) calc(var(--gap) * 2);
  display: flex;
  column-gap: var(--gap);
  align-items: flex-start;
  margin-bottom: var(--gap);
  grid-column: span 4;
`;

const CollectionCover = styled.div`
  min-width: 40px;
`;

const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  column-gap: 0;
  row-gap: 0;
`;

const CollectionProperties = styled.div`
  display: flex;
  column-gap: var(--gap);
`;

export default CollectionCard;
