import React, { useCallback, useEffect, useState, useMemo, VFC } from 'react';
import styled from 'styled-components';
import { useApi } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { Button, SelectOptionProps } from '@unique-nft/ui-kit';

import { PagePaperWrapper } from '@app/components';
import { collections as gqlCollections, CollectionSorting } from '@app/api/graphQL';
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

  const orderBy = useMemo((): CollectionSorting => selectedSort.id === 'new' ? { date_of_creation: 'asc' } : { actions_count: 'asc' }, [selectedSort.id]);

  const { collections, fetchMoreCollections, isCollectionsFetching, timestamp } = gqlCollections.useGraphQlCollections({ orderBy, pageSize });
  const linkUrl = `/${currentChain.network}/collections`;

  const onClick = useCallback(() => {
    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_COLLECTIONS_ON_MAIN_PAGE);
    navigate(linkUrl);
  }, [linkUrl, navigate]);

  useEffect(() => {
    if (searchString === undefined) {
      return;
    }

    void fetchMoreCollections({
      limit: pageSize,
      orderBy,
      searchString
    });
  }, [searchString, fetchMoreCollections, orderBy]);

  console.log('collection', collections, 'selectedSort', selectedSort);

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
            timestamp={timestamp}
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

const Wrapper = styled(PagePaperWrapper)`
  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;

const CollectionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: var(--gap);
  grid-row-gap: var(--gap);
  position: relative;
  margin-bottom: calc(var(--gap) * 1.5);

  @media (min-width: 576px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;
