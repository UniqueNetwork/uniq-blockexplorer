import { useEffect, useCallback, useState, useMemo, VFC } from 'react';
import styled from 'styled-components/macro';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@unique-nft/ui-kit';

import {
  DeviceSize,
  deviceWidth,
  useApi,
  useDeviceSize,
  useQueryParams,
} from '@app/hooks';
import { Header } from '@app/styles/styled-components';
import { PagePaperWrapper, DropdownOptionProps } from '@app/components';
import {
  CollectionSorting,
  useGraphQlCollections,
  useGraphQlTokens,
} from '@app/api/graphQL';
import { logUserEvents } from '@app/utils/logUserEvents';
import { UserEvents } from '@app/analytics/user_analytics';
import { defaultSorting } from '@app/pages/Collections/constants';
import { CollectionCard } from '@app/components/CollectionCard';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
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
  const { setParamToQuery, mainCollectionsSort } = useQueryParams();
  const defaultSort = collectionsOptions.find(
    (option) => option.id === mainCollectionsSort,
  );
  const [selectedSort, setSelectedSort] = useState<DropdownOptionProps>(
    defaultSort || collectionsOptions[0],
  );

  const onOrderChange = (newOrder: DropdownOptionProps) => {
    setParamToQuery([
      {
        name: 'mainCollectionsSort',
        value: newOrder.id as string,
      },
    ]);
    setSelectedSort(newOrder);
  };

  const orderBy = useMemo(
    (): CollectionSorting =>
      selectedSort.id === 'new'
        ? { date_of_creation: 'desc_nulls_last' }
        : { transfers_count: 'desc_nulls_last' },
    [selectedSort.id],
  );

  const deviceSize = useDeviceSize();

  const pageSize = useMemo(() => {
    if (deviceSize === DeviceSize.xl || deviceSize === DeviceSize.xxl) return 6;

    return 4;
  }, [deviceSize]);

  const { collections, collectionsCount, isCollectionsFetching, timestamp } =
    useGraphQlCollections({
      filter: { burned: { _eq: 'false' } },
      orderBy,
      pageSize,
      searchString,
    });

  useEffect(() => {
    if (searchModeOn && !isCollectionsFetching && setResultExist) {
      setResultExist(!!collections?.length);
    }
  }, [collections, isCollectionsFetching, setResultExist, searchModeOn]);

  const collectionIds = collections?.map((collection) => collection.collection_id);
  const filter = {
    _and: [
      { collection_id: { _in: collectionIds } },
      { token_id: { _eq: 1 } },
      { burned: { _eq: 'false' } },
    ],
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
      tokens?.find((token) => token.collection_id === collection.collection_id)?.image ||
      '',
  }));

  const onClick = useCallback(() => {
    let params: { sort?: string; search?: string } = {};
    params.sort = defaultSorting;

    if (searchString) {
      params.search = searchString;
    }

    logUserEvents(UserEvents.Click.BUTTON_SEE_ALL_COLLECTIONS_ON_MAIN_PAGE);
    navigate({
      pathname: `/${currentChain.network.toLowerCase()}/collections/`,
      search: `?${createSearchParams(params)}`,
    });
  }, [currentChain, navigate, searchString]);

  const [showButton, setShowButton] = useState<boolean>(true);

  useEffect(() => {
    if (collectionsCount > pageSize) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [collectionsCount, pageSize, setShowButton]);

  if (!isCollectionsFetching && !collections.length) return null;

  return (
    <Wrapper data-automation-id="collections">
      {searchModeOn ? (
        <StyledHeader size="2">Collections</StyledHeader>
      ) : (
        <HeaderWithDropdown
          options={collectionsOptions}
          selectedSort={selectedSort}
          setSelectedSort={onOrderChange}
          title="Collections"
        />
      )}
      {isCollectionsFetching ? (
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      ) : (
        <CollectionsList>
          {collectionsWithTokenCover.map((collection) => (
            <CollectionCard
              key={`collection-${collection.collection_id}`}
              timestamp={timestamp}
              {...collection}
            />
          ))}
        </CollectionsList>
      )}
      {showButton && (
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

const SkeletonWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-grow: 1;

  .unique-skeleton {
    width: 100%;
    min-height: 536px;
    border-radius: var(--gap) !important;
  }

  @media ${deviceWidth.smallerThan.md} {
    .unique-skeleton {
      width: 100%;
      min-height: 420px;
    }
  }

  @media ${deviceWidth.smallerThan.sm} {
    .unique-skeleton {
      width: 100%;
      min-height: 820px;
    }
  }
`;

const Wrapper = styled(PagePaperWrapper)`
  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;

const StyledHeader = styled(Header)`
  margin-bottom: 32px !important;
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
