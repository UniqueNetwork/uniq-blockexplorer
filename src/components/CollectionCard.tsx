import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import Avatar from './Avatar';
import AccountLinkComponent from '../pages/Account/components/AccountLinkComponent';
import { Collection } from '../api/graphQL';
import config from '../config';
import { useApi } from '../hooks/useApi';

const {
  IPFSGateway
} = config;

type CollectionCardProps = Collection & { className?: string}

const CollectionCard: FC<CollectionCardProps> = ({
  className,
  collection_cover: cover,
  collection_id: collectionId,
  name,
  owner,
  token_prefix: tokenPrefix,
  tokens_aggregate: tokensAggregate
}) => {
  const {
    currentChain
  } = useApi();

  const tokensCount = tokensAggregate?.aggregate.count || 0;

  return (
    <Link
      className={className}
      to={`/${currentChain.network}/collections/${collectionId}`}
    >
      <div className={'cover'}>
        <Avatar
          size={'small'}
          src={cover ? `${IPFSGateway || ''}/${cover}` : undefined}
        />
      </div>
      <div className={'collection-info'}>
        <Text>{name}</Text>
        <div className={'properties'}>
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
        </div>
        <div>
          <Text color={'grey-500'}>Owner: </Text>
          <AccountLinkComponent value={owner} />
        </div>
      </div>
    </Link>
  );
};

export default styled(CollectionCard)`
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
  .cover {
    min-width: 40px;
  }
  .collection-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 0;
    row-gap: 0;
    .properties {
      display: flex;
      column-gap: var(--gap);
    }
  }
`;
