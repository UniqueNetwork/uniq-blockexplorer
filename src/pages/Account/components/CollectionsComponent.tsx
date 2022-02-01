import React, { FC, Reducer, useCallback, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { InputText, Checkbox, Button } from '@unique-nft/ui-kit';

import { Collection, collections as gqlCollection } from '../../../api/graphQL';
import CollectionCard from '../../../components/CollectionCard';
import { useApi } from '../../../hooks/useApi';
import SearchComponent from '../../../components/SearchComponent';

interface CollectionsComponentProps {
  accountId: string
}

type ActionType = 'All' | 'Owner';

const pageSize = 6;

const CollectionsComponent: FC<CollectionsComponentProps> = ({ accountId }) => {
  const [filter, dispatchFilter] = useReducer<
  Reducer<Record<string, unknown> | undefined, { type: ActionType; value: string | boolean }>
  >((state, action) => {
    if (action.type === 'All' && action.value) {
      return undefined;
    }

    if (action.type === 'Owner') {
      return { ...state, owner: action.value ? { _eq: accountId } : undefined };
    }

    return state;
  }, undefined);

  const { currentChain } = useApi();

  const navigate = useNavigate();

  const [searchString, setSearchString] = useState<string | undefined>();

  const { collections, collectionsCount, fetchMoreCollections } =
    gqlCollection.useGraphQlCollections({
      pageSize
    });

  const onCheckBoxChange = useCallback(
    (actionType: ActionType) => (value: boolean) => dispatchFilter({ type: actionType, value }),
    [dispatchFilter]
  );

  const onSearchChange = useCallback(
    (value: string | number | undefined) => setSearchString(value?.toString()),
    [setSearchString]
  );

  const onSearchClick = useCallback(() =>
    fetchMoreCollections({ searchString }),
  [fetchMoreCollections, searchString]);

  const onClickSeeMore = useCallback(() => {
    navigate(`/${currentChain.network}/collections`);
  }, [currentChain, navigate]);

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') return onSearchClick();
    },
    [onSearchClick]
  );

  return (<>
    <ControlsContainer>
      <SearchComponent
        onChangeSearchString={onSearchChange}
        onSearchClick={onSearchClick}
        onSearchKeyDown={onSearchKeyDown}
        placeholder={'Collection'}
      />
      <FilterContainer>
        <Checkbox
          checked={filter === undefined}
          label={'All'}
          onChange={onCheckBoxChange('All')}
          size={'s'}
        />
        <Checkbox
          checked={!!filter?.owner}
          label={'Owner'}
          onChange={onCheckBoxChange('Owner')}
          size={'s'}
        />
      </FilterContainer>
    </ControlsContainer>
    <ItemsCountContainer>{collectionsCount || 0} items</ItemsCountContainer>
    <CollectionsContainer>
      {collections?.map &&
          collections.map((collection: Collection) => (
            <CollectionCard
              key={`collection-${collection.collection_id}`}
              {...collection}
            />
          ))}
    </CollectionsContainer>
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

const ControlsContainer = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  margin-top: var(--gap);
`;

const FilterContainer = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
`;

const ItemsCountContainer = styled.div`
  margin: var(--gap) 0;
`;

const CollectionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: var(--gap);
`;

export default CollectionsComponent;
