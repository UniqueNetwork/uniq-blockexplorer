import { useEffect, useCallback, useState, useMemo, VFC } from 'react';
import styled from 'styled-components';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, SelectOptionProps } from '@unique-nft/ui-kit';

import { DeviceSize, deviceWidth, useApi, useDeviceSize } from '@app/hooks';
import { Header } from '@app/styles/styled-components';
import { PagePaperWrapper } from '@app/components';
import {
  CollectionSorting,
  useGraphQlCollections,
  useGraphQlTokens,
} from '@app/api/graphQL';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import LoadingComponent from '@app/components/LoadingComponent';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
import { CollectionCard } from './CollectionCard';
import { collectionsOptions } from './collectionsOptions';

interface CollectionsProps {
  searchModeOn: boolean;
  searchString?: string;
  setResultExist?: (val: boolean) => void;
}

export const Collections: VFC<CollectionsProps> = ({
  searchModeOn,
  searchString,
  setResultExist,
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(
    collectionsOptions[0],
  );

  const orderBy = useMemo(
    (): CollectionSorting =>
      selectedSort.id === 'new'
        ? { date_of_creation: 'desc' }
        : { transfers_count: 'desc' },
    [selectedSort.id],
  );

  const deviceSize = useDeviceSize();

  const pageSize = useMemo(() => {
    if (deviceSize === DeviceSize.xl || deviceSize === DeviceSize.xxl) return 6;

    return 4;
  }, [deviceSize]);

  const { collections, isCollectionsFetching, timestamp } = useGraphQlCollections({
    orderBy,
    pageSize,
    searchString,
  });

  useEffect(() => {
    if (
      searchModeOn &&
      !isCollectionsFetching &&
      setResultExist &&
      !!collections?.length
    ) {
      setResultExist(true);
    }
  }, [collections, isCollectionsFetching, setResultExist, searchModeOn]);

  const collectionIds = collections?.map((collection) => collection.collection_id);
  const filter = {
    _and: [{ collection_id: { _in: collectionIds } }, { token_id: { _eq: 1 } }],
  };

  const { tokens } = useGraphQlTokens({
    filter,
    offset: 0,
    pageSize,
  });

  const collectionsWithTokenCover = collections?.map((collection) => ({
    ...collection,
    collection_cover:
      collection.collection_cover ||
      tokens?.find((token) => token.collection_id === collection.collection_id)?.image
        ?.fullUrl ||
      '',
  }));

  const onClick = useCallback(() => {
    const linkUrl = `/${currentChain.network}/collections`;
    const navigateTo: { pathname: string; search?: string } = { pathname: linkUrl };

    if (searchString) {
      const searchParams = `?${createSearchParams([['search', `${searchString}`]])}`;

      navigateTo.search = searchParams;
    }

    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_COLLECTIONS_ON_MAIN_PAGE);
    navigate(navigateTo);
  }, [currentChain, navigate, searchString]);

  if (!collections.length) return null;

  return (
    <Wrapper>
      {searchModeOn ? (
        <StyledHeader size="2">Collections</StyledHeader>
      ) : (
        <HeaderWithDropdown
          options={collectionsOptions}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          title="Collections"
        />
      )}
      <CollectionsList>
        {isCollectionsFetching && <LoadingComponent />}
        {collectionsWithTokenCover.map((collection) => (
          <CollectionCard
            key={`collection-${collection.collection_id}`}
            timestamp={timestamp}
            {...collection}
          />
        ))}
      </CollectionsList>
      {collections.length > pageSize && (
        <Button
          iconRight={{
            color: 'white',
            name: 'arrow-right',
            size: 10,
          }}
          role="primary"
          title="See all"
          onClick={onClick}
        />
      )}
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

const StyledHeader = styled(Header)`
  @media ${deviceWidth.smallerThan.md} {
    font-size: 20px !important;
    line-height: 28px !important;
    font-weight: 700 !important;
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
