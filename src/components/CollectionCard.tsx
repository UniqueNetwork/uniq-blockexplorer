import React, { FC, useCallback, useEffect, useState } from 'react';
import Avatar from './Avatar';
import AccountLinkComponent from '../pages/Account/components/AccountLinkComponent';
import { Collection } from '../api/graphQL';
import { useApi } from '../hooks/useApi';
import { NFTCollection } from '../api/chainApi/unique/types';

// tslint:disable-next-line:no-empty-interface
type CollectionCardProps = Collection

const CollectionCard: FC<CollectionCardProps> = (props) => {
  const { collection_id: collectionId,
    name,
    owner,
    token_prefix: tokenPrefix,
    tokens_aggregate: tokensAggregate } = props;

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
      className={
        'grid-item_col4 flexbox-container flexbox-container_align-start card margin-bottom'
      }
    >
      <div style={{ minWidth: '40px' }}>
        <Avatar
          size={'small'}
          src={collectionImageUrl}
        />
      </div>
      <div className={'flexbox-container flexbox-container_column flexbox-container_without-gap'}>
        <h4>{name}</h4>
        <div className={'flexbox-container'}>
          <span>
            <span className={'text_grey'}>ID:</span>
            {collectionId}
          </span>
          <span>
            <span className={'text_grey'}>Prefix:</span>
            {tokenPrefix}
          </span>
          <span>
            <span className={'text_grey'}>Items:</span>
            {tokensCount}
          </span>
        </div>
        <div>
          <span className={'text_grey'}>Owner: </span>
          <AccountLinkComponent value={owner} />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
