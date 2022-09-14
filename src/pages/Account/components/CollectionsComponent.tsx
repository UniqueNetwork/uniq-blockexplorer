import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@unique-nft/ui-kit';

import { useApi, useSearchFromQuery } from '@app/hooks';
import { Collection, useGraphQlCollections } from '@app/api/graphQL';
import { Search } from '@app/components';

import CollectionCard from '../../../components/CollectionCard';

interface CollectionsComponentProps {
  accountId: string;
}

const pageSize = 6;

const CollectionsComponent: FC<CollectionsComponentProps> = ({ accountId }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const searchFromQuery = useSearchFromQuery();
  const [searchString, setSearchString] = useState<string | undefined>(searchFromQuery);

  const { collections, collectionsCount } = useGraphQlCollections({
    filter: {
      _or: [{ owner: { _eq: accountId } }, { owner_normalized: { _eq: accountId } }],
    },
    pageSize,
    searchString,
  });

  const onClickSeeMore = () => {
    navigate(`/${currentChain.network}/collections/?accountId=${accountId}`);
  };

  useEffect(() => {
    setSearchString(searchFromQuery);
  }, [searchFromQuery]);

  return (
    <>
      <ControlsWrapper>
        <Search
          placeholder={'NFT / collection'}
          value={searchString}
          onSearchChange={setSearchString}
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
          size: 12,
        }}
        role="primary"
        title={'See all'}
        onClick={onClickSeeMore}
      />
    </>
  );
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
