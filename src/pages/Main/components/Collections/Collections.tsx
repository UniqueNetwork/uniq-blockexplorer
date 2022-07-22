import React, { useCallback, useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { useApi } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { Button, SelectOptionProps } from '@unique-nft/ui-kit';

import { PagePaperWrapper } from '@app/components';
import { collections as gqlCollections } from '@app/api/graphQL';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import LoadingComponent from '@app/components/LoadingComponent';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
import { CollectionCard } from './CollectionCard';
import { collectionsOptions } from './collectionsOptions';

interface CollectionsProps {
  searchString?: string
}

const pageSize = 6;

export const Collections: VFC<CollectionsProps> = ({ searchString }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(collectionsOptions[0]);

  const { collections, fetchMoreCollections, isCollectionsFetching } = gqlCollections.useGraphQlCollections({ orderBy: { collection_id: 'desc' }, pageSize });

  const onClick = useCallback(() => {
    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_COLLECTIONS_ON_MAIN_PAGE);
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
  }, [searchString, fetchMoreCollections]);

  console.log('collections', collections);

  return (
    <Wrapper>
      <HeaderWithDropdown
        options={collectionsOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        title='Collections'
      />
      <CollectionsList>
        {isCollectionsFetching && <LoadingComponent />}
        {collections.map((collection) => (
          <CollectionCard
            key={`collection-${collection.collection_id}`}
            {...collection}
          />
        ))}
      </CollectionsList>
      <Button
        iconRight={{
          color: 'white',
          name: 'arrow-right',
          size: 10
        }}
        onClick={onClick}
        role='primary'
        title='See all'
      />
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)``;
const CollectionsList = styled.div`
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
