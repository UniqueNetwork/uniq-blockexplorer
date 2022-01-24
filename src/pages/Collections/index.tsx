import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, InputText } from '@unique-nft/ui-kit';
import CollectionsComponent from './components/CollectionsComponent';
import { useGraphQlCollections } from '../../api/graphQL/collections/collections';
import { useApi } from '../../hooks/useApi';

const pageSize = 20; // default

const CollectionsPage: FC<{ className?: string }> = ({ className }) => {
  const [searchString, setSearchString] = useState('');
  const { collections, collectionsCount, fetchMoreCollections, isCollectionsFetching } = useGraphQlCollections({ pageSize });

  const { api } = useApi();

  const onPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreCollections({
        limit,
        offset
      }),
    [fetchMoreCollections]
  );

  const onSearchClick = useCallback(() => {

  }, [searchString]);

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') onSearchClick();
    },
    [onSearchClick]
  );

  const onChangeSearchString = useCallback((value: string | undefined) => {
    setSearchString(value?.toString() || '');
  }, [setSearchString]);

  return (<div className={className}>
    <div className={'search-wrap'}>
      <InputText
        className={'input-width-612'}
        iconLeft={{ name: 'magnify', size: 18 }}
        onChange={onChangeSearchString}
        onKeyDown={onSearchKeyDown}
        placeholder={'Extrinsic / account'}
      />
      <Button
        onClick={onSearchClick}
        role={'primary'}
        title='Search'
      />
    </div>
    <div>
      <CollectionsComponent
        count={collectionsCount}
        data={collections}
        loading={isCollectionsFetching}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </div>
  </div>);
};

export default styled(CollectionsPage)`
  > .search-wrap {
    display: flex;
    margin-bottom: calc(var(--gap) * 2);
    .input-width-612 {
      box-sizing: border-box;
      width: 612px;
      margin-right: calc(var(--gap) / 2);
    }
  }
`;
