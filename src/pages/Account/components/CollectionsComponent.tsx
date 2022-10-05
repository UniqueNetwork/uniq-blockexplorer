import { Button } from '@unique-nft/ui-kit';
import { FC, useCallback, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Collection, useGraphQlCollections } from '@app/api/graphQL';
import { Search } from '@app/components';
import { useApi, useSearchFromQuery } from '@app/hooks';
import { defaultSorting } from '@app/pages/Collections/constants';

import { CollectionCard } from '../../../components/CollectionCard';

interface CollectionsComponentProps {
  accountId: string;
}

const pageSize = 6;

const CollectionsComponent: FC<CollectionsComponentProps> = ({ accountId }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const { searchString, setSearchString } = useSearchFromQuery();
  const [queryParams, setQueryParams] = useSearchParams();

  const { collections, collectionsCount } = useGraphQlCollections({
    filter: {
      _or: [{ owner: { _eq: accountId } }, { owner_normalized: { _eq: accountId } }],
    },
    pageSize,
    searchString,
  });

  const onClickSeeMore = useCallback(() => {
    let params: { accountId?: string; search?: string; sort?: string } = {};
    params.sort = defaultSorting;

    if (accountId) {
      params.accountId = accountId;
    }

    if (searchString) {
      params.search = searchString;
    }

    setQueryParams(queryParams);
    navigate({
      pathname: `/${currentChain.network.toLowerCase()}/collections/`,
      search: `?${createSearchParams(params)}`,
    });
  }, [
    accountId,
    searchString,
    setQueryParams,
    queryParams,
    navigate,
    currentChain.network,
  ]);

  const showButton = collectionsCount > pageSize;

  return (
    <>
      <ControlsWrapper>
        <Search placeholder="NFT / collection" onSearchChange={setSearchString} />
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
      {showButton && (
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
      )}
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
