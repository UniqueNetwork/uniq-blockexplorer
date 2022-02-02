import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, InputText } from '@unique-nft/ui-kit';
import CollectionsComponent from './components/CollectionsComponent';
import { collections as gqlCollections } from '../../api/graphQL/';
import SearchComponent from '../../components/SearchComponent';

const pageSize = 20; // default

const CollectionsPage: FC = () => {
  const [searchString, setSearchString] = useState('');
  const {
    collections,
    collectionsCount,
    fetchMoreCollections,
    isCollectionsFetching
  } = gqlCollections.useGraphQlCollections({ pageSize });

  const onPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreCollections({
        limit,
        offset
      }),
    [fetchMoreCollections]
  );

  const onSearchClick = useCallback(() => fetchMoreCollections({
    searchString
  }), [searchString, fetchMoreCollections]);

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') return onSearchClick();
    },
    [onSearchClick]
  );

  const onChangeSearchString = useCallback((value: string | undefined) => {
    setSearchString(value?.toString() || '');
  }, [setSearchString]);

  return (<>
    <SearchComponent
      onChangeSearchString={onChangeSearchString}
      onSearchClick={onSearchClick}
      onSearchKeyDown={onSearchKeyDown}
      placeholder={'Collection / account'}
    />
    <div>
      <CollectionsComponent
        count={collectionsCount}
        data={collections}
        loading={isCollectionsFetching}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </div>
  </>);
};

export default CollectionsPage;
