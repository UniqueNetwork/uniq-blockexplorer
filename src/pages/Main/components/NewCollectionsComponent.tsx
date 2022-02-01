import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@unique-nft/ui-kit';
import { useApi } from '../../../hooks/useApi';
import { Collection } from '../../../api/graphQL';
import LoadingComponent from '../../../components/LoadingComponent';
import CollectionCard from '../../../components/CollectionCard';

interface CollectionsComponentProps {
  collections: Collection[]
  loading?: boolean
}

const CollectionsComponent: FC<CollectionsComponentProps> = ({
  collections,
  loading
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(`/${currentChain.network}/collections`);
  }, [currentChain, navigate]);

  return (
    <>
      <CollectionsContainer>
        {loading && <LoadingComponent />}
        {collections.map((collection) => (
          <CollectionCard
            key={`collection-${collection.collection_id}`}
            {...collection}
          />
        ))}
      </CollectionsContainer>
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

const CollectionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: var(--gap);
`;

export default CollectionsComponent;
