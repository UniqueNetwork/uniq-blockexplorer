import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Button } from '@unique-nft/ui-kit';
import { useApi } from '../../../hooks/useApi';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import { Collection } from '../../../api/graphQL';
import LoadingComponent from '../../../components/LoadingComponent';

interface CollectionsComponentProps {
  collections: Collection[]
  loading?: boolean
}

const CollectionCard: FC<Collection> = (props) => (
  <div
    className={'grid-item_col4 flexbox-container flexbox-container_align-start card margin-bottom'}
  >
    <Avatar size={'small'} />
    <div className={'flexbox-container flexbox-container_column flexbox-container_without-gap'}>
      <h4>{props.name}</h4>
      <div className={'flexbox-container'}>
        <span>
          <span className={'text_grey'}>ID:</span>
          {props.collection_id}
        </span>
        <span>
          <span className={'text_grey'}>Prefix:</span>
          {props.token_prefix}
        </span>
        <span>
          <span className={'text_grey'}>Items:</span>
          {props.tokens_aggregate.aggregate.count}
        </span>
      </div>
      <div>
        <span className={'text_grey'}>Owner: </span>
        <AccountLinkComponent value={props.owner} />
      </div>
    </div>
  </div>
);

const CollectionsComponent: FC<CollectionsComponentProps> = (props) => {
  const { collections, loading } = props;
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(`/${currentChain.network}/collections`);
  }, [currentChain]);

  return (
    <>
      <div className={'grid-container'}>
        {loading && <LoadingComponent />}
        {collections.map((collection) => (
          <CollectionCard
            key={`collection-${collection.collection_id}`}
            {...collection}
          />
        ))}
      </div>
      <Button
        iconRight={{
          color: 'white',
          name: 'arrow-right',
          size: 10
        }}
        onClick={onClick}
        role={'primary'}
        title={'See all'}
      />
    </>
  );
};

export default CollectionsComponent;
