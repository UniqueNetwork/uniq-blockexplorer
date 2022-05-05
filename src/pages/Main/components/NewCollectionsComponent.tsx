import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@unique-nft/ui-kit';

import { useApi } from '../../../hooks/useApi';
import { collections as gqlCollections } from '../../../api/graphQL';
import LoadingComponent from '../../../components/LoadingComponent';
import CollectionCard from '../../../components/CollectionCard';

interface NewCollectionsComponentProps {
  searchString?: string
  pageSize?: number
}

const NewCollectionsComponent: FC<NewCollectionsComponentProps> = ({ pageSize = 6, searchString }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const { collections, fetchMoreCollections, isCollectionsFetching } = gqlCollections.useGraphQlCollections({ orderBy: { collection_id: 'desc' }, pageSize });

  const onClick = useCallback(() => {
    navigate(`/${currentChain.network}/collections`);
  }, [currentChain, navigate]);

  useEffect(() => {
    if (searchString === undefined) {
      return;
    }

    void fetchMoreCollections({
      limit: pageSize,
      orderBy: { collection_id: 'desc' },
      searchString
    });
  }, [searchString, fetchMoreCollections, pageSize]);

  return (
    <>
      <CollectionsWrapper>
        {isCollectionsFetching && <LoadingComponent />}
        {collections.map((collection) => (
          <CollectionCard
            key={`collection-${collection.collection_id}`}
            {...collection}
          />
        ))}
      </CollectionsWrapper>
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

export default NewCollectionsComponent;
