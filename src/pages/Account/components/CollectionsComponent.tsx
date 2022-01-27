import React, { FC, Reducer, useCallback, useReducer, useState } from 'react';
import { InputText, Checkbox, Button } from '@unique-nft/ui-kit';
import { Collection, collections as gqlCollection } from '../../../api/graphQL';
import CollectionCard from '../../../components/CollectionCard';

interface CollectionsComponentProps {
  accountId: string
}

type ActionType = 'All' | 'Owner';

const pageSize = 6;

const CollectionsComponent: FC<CollectionsComponentProps> = (props) => {
  const { accountId } = props;

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

  const onSearchChange = useCallback(
    (value: string | number | undefined) => setSearchString(value?.toString()),
    [setSearchString]
  );

  const onSearchClick = useCallback(() => {
    fetchMoreCollections({ searchString })
      .catch((errMsg) => console.error(errMsg));
  }, [fetchMoreCollections, searchString]);

  const onClickSeeMore = useCallback(() => {}, []);

  return (
    <>
      <div className={'flexbox-container flexbox-container_space-between margin-top'}>
        <div className={'flexbox-container flexbox-container_half-gap'}>
          <InputText
            onChange={onSearchChange}
            placeholder={'Collection name'}
          />
          <Button
            onClick={onSearchClick}
            role='primary'
            title={'Search'}
          />
        </div>
        <div className={'flexbox-container'}>
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
        </div>
      </div>
      <div className={'margin-top margin-bottom'}>{collectionsCount || 0} items</div>
      <div className={'grid-container'}>
        {collections?.map &&
          collections.map((collection: Collection) => (
            <CollectionCard
              key={`collection-${collection.collection_id}`}
              {...collection}
            />
          ))}
      </div>
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
    </>
  );
};

export default CollectionsComponent;
