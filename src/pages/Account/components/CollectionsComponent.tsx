import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@unique-nft/ui-kit';

import { useApi } from '@app/hooks';
import { Collection, useGraphQlCollections } from '@app/api/graphQL';

import CollectionCard from '../../../components/CollectionCard';
import SearchComponent from '../../../components/SearchComponent';

interface CollectionsComponentProps {
  accountId: string
}

const pageSize = 6;

const CollectionsComponent: FC<CollectionsComponentProps> = ({ accountId }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  // TODO - fix search for all pages and remove this
  const [searchString, setSearchString] = useState<string | undefined>();

  const { collections, collectionsCount } =
    useGraphQlCollections({
      filter: {
        _or: [
          { owner: { _eq: accountId } },
          { owner_normalized: { _eq: accountId } }
        ]
      },
      pageSize,
      searchString
    });

  const onClickSeeMore = () => {
    navigate(`/${currentChain.network}/collections/?accountId=${accountId}`);
  };

  return (<>
    <ControlsWrapper>
      <SearchComponent
        onSearchChange={setSearchString}
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

  @media (max-width: 1199px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 767px) {
    border: none;
    padding: 0;
  }
`;

export default CollectionsComponent;
