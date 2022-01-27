import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import Avatar from './Avatar';
import AccountLinkComponent from '../pages/Account/components/AccountLinkComponent';
import { Collection } from '../api/graphQL';
import { useApi } from '../hooks/useApi';
import { NFTCollection } from '../api/chainApi/unique/types';

type CollectionCardProps = Collection & { className?: string}

const CollectionCard: FC<CollectionCardProps> = ({ className,
  collection_id: collectionId,
  name,
  owner,
  token_prefix: tokenPrefix,
  tokens_aggregate: tokensAggregate }) => {
  const tokensCount = tokensAggregate.aggregate.count;

  const [collectionImageUrl, setCollectionImageUrl] = useState<string>();

  const { api, rpcClient } = useApi();

  const fetchCollection = useCallback(async () => {
    if (rpcClient?.isApiConnected) {
      const collectionInfo = await api?.getCollection(collectionId) as NFTCollection;

      setCollectionImageUrl(collectionInfo?.coverImageUrl);
    }
  }, [api, collectionId, rpcClient?.isApiConnected]);

  useEffect(() => {
    fetchCollection()
      .catch((errMsg) => console.error(errMsg));
  }, [fetchCollection]);

  return (
    <div
      className={className}
    >
      <div className={'cover'}>
        <Avatar
          size={'small'}
          src={collectionImageUrl}
        />
      </div>
      <div className={'collection-info'}>
        <h4>{name}</h4>
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
    </div>
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
    }
  }
`;
