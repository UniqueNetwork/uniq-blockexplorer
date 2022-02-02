import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, InputText } from '@unique-nft/ui-kit';
import TokensComponent from './components/TokensComponent';
import { tokens as gqlTokens } from '../../api/graphQL/';
import SearchComponent from '../../components/SearchComponent';

const pageSize = 20; // default

const TokensPage: FC = () => {
  const [searchString, setSearchString] = useState('');
  const {
    fetchMoreTokens,
    isTokensFetching,
    tokens,
    tokensCount
  } = gqlTokens.useGraphQlTokens({ pageSize });

  const onPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreTokens({
        limit,
        offset
      }),
    [fetchMoreTokens]
  );

  const onSearchClick = useCallback(() => fetchMoreTokens({
    searchString
  }), [searchString, fetchMoreTokens]);

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
      placeholder={'NFT / collection / account'}
    />
    <div>
      <TokensComponent
        count={tokensCount}
        data={tokens}
        loading={isTokensFetching}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </div>
  </>);
};

export default TokensPage;
