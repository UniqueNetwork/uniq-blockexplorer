import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@unique-nft/ui-kit';

import { Collection, collections as gqlCollection } from '../../../api/graphQL';
import CollectionCard from '../../../components/CollectionCard';
import { useApi } from '../../../hooks/useApi';
import SearchComponent from '../../../components/SearchComponent';
import { normalizeSubstrate } from '@app/utils';

interface CollectionsComponentProps {
  accountId: string
}

const pageSize = 6;

const CollectionsComponent: FC<CollectionsComponentProps> = ({ accountId }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const { collections, collectionsCount, fetchMoreCollections } =
    gqlCollection.useGraphQlCollections({
      filter: {
        owner: { _eq: normalizeSubstrate(accountId) }
      },
      pageSize
    });

  const onClickSeeMore = useCallback(() => {
    navigate(`/${currentChain.network}/collections/?accountId=${accountId}`);
  }, [currentChain.network, navigate, accountId]);

  const onSearch = useCallback((searchString: string) => {
    void fetchMoreCollections({
      filter: {
        owner: { _eq: normalizeSubstrate(accountId) }
      },
      searchString
    });
  }, [accountId, fetchMoreCollections]);

  return (<>
    <ControlsWrapper>
      <SearchComponent
        onSearchChange={onSearch}
        placeholder={'NFT / collection'}
      />
    </ControlsWrapper>
    <ItemsCountWrapper>{collectionsCount || 0} items</ItemsCountWrapper>
    <CollectionsWrapper>
      {collections?.map &&
          collections.map((collection: Collection) => (
            <CollectionCard
              key={`collection-${collection.collection_id}`}
              {...collection}
            />
          ))}
    </CollectionsWrapper>
    <Button
      iconRight={{
        color: '#fff',
        name: 'arrow-right',
        size: 12
      }}
      onClick={onClickSeeMore}
      role='primary'
      title={'See all'}
    />
  </>);
};

const ControlsWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  margin-top: var(--gap);
`;

const ItemsCountWrapper = styled.div`
  margin: var(--gap) 0;
`;

const CollectionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: var(--gap);
  grid-row-gap: var(--gap);
  position: relative;
  margin-bottom: calc(var(--gap) * 1.5);

  @media (max-width: 1919px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1279px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 767px) {
    border: none;
    padding: 0;
  }
`;

export default CollectionsComponent;
