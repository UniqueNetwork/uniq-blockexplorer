import React, { FC, Reducer, useCallback, useEffect, useReducer, useState } from 'react';
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
  const { currentChain } = useApi();
  const navigate = useNavigate();

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

  const [searchString, setSearchString] = useState<string | undefined>();

  const { collections, collectionsCount, fetchMoreCollections } =
    gqlCollection.useGraphQlCollections({
      pageSize
    });

  const onCheckBoxChange = useCallback(
    (actionType: ActionType) => (value: boolean) => dispatchFilter({ type: actionType, value }),
    [dispatchFilter]
  );

  const onClickSeeMore = useCallback(() => {
    navigate(`/${currentChain.network}/collections`);
  }, [currentChain, navigate]);

  useEffect(() => {
    void fetchMoreCollections({
      filter,
      searchString
    });
  }, [searchString, filter, fetchMoreCollections]);

  return (<>
    <ControlsWrapper>
      <SearchComponent
        onSearchChange={setSearchString}
        placeholder={'NFT / collection'}
      />
      <FilterWrapper>
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
      </FilterWrapper>
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
        size: 12
      }}
      onClick={onClickSeeMore}
      role='primary'
      title={'See all'}
    />
  </>);
};

const ControlsWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  margin-top: var(--gap);
`;

const FilterWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
`;

const ItemsCountWrapper = styled.div`
  margin: var(--gap) 0;
`;

const CollectionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: var(--gap);
`;

export default CollectionsComponent;
