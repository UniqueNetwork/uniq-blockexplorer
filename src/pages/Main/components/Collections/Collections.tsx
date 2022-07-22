import React, { useCallback, useEffect, VFC } from 'react';
import styled from 'styled-components';
import { useApi } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@unique-nft/ui-kit';

import { PagePaperWrapper } from '@app/components';
import { collections as gqlCollections } from '@app/api/graphQL';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import LoadingComponent from '@app/components/LoadingComponent';

import CollectionCard from './CollectionCard';

interface CollectionsProps {
  searchString?: string
}

const pageSize = 6;

export const Collections: VFC<CollectionsProps> = ({ searchString }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

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
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)``;
const CollectionsWrapper = styled.div``;
