import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, InputText } from '@unique-nft/ui-kit';
import TokensComponent from './components/TokensComponent';
import { tokens as gqlTokens } from '../../api/graphQL/';

const pageSize = 20; // default

const TokensPage: FC<{ className?: string }> = ({
  className
}) => {
  const [searchString, setSearchString] = useState('');
  const {
    fetchMoreTokens, isTokensFetching, tokens, tokensCount
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
    ({
      key
    }) => {
      if (key === 'Enter') return onSearchClick();
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
      <TokensComponent
        count={tokensCount}
        data={tokens}
        loading={isTokensFetching}
        onPageChange={onPageChange}
        pageSize={pageSize}
      />
    </div>
  </div>);
};

export default styled(TokensPage)`
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
