import React, { FC, Reducer, useCallback, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Checkbox, InputText, Button } from '@unique-nft/ui-kit';
import { Token, tokens as gqlTokens } from '../../../api/graphQL';
import TokenCard from '../../../components/TokenCard';

interface TokensComponentProps {
  accountId: string
  className?: string
}

type ActionType = 'All' | 'Minted' | 'Received'

const pageSize = 18;

const TokensComponent: FC<TokensComponentProps> = ({ accountId, className }) => {
  const [filter, dispatchFilter] = useReducer<
  Reducer<Record<string, unknown> | undefined, { type: ActionType; value: string | boolean }>
  >((state, action) => {
    if (action.type === 'All' && action.value) {
      return undefined;
    }

    if (action.type === 'Minted') {
      return { ...state, minted: action.value ? { _eq: accountId } : undefined };
    }

    if (action.type === 'Received') {
      return { ...state, received: action.value ? { _eq: accountId } : undefined };
    }

    return state;
  }, undefined);

  const [searchString, setSearchString] = useState<string | undefined>();

  const { fetchMoreTokens, tokens, tokensCount } = gqlTokens.useGraphQlTokens({ filter, pageSize });

  const onCheckBoxChange = useCallback(
    (actionType: ActionType) => (value: boolean) => dispatchFilter({ type: actionType, value }),
    [dispatchFilter]
  );

  const onSearchChange = useCallback(
    (value: string | number | undefined) => setSearchString(value?.toString()),
    [setSearchString]
  );

  const onSearchClick = useCallback(() => {
    fetchMoreTokens({ searchString })
      .catch((errMsg) => console.error(errMsg));
  }, [fetchMoreTokens, searchString]);

  const onClickSeeMore = useCallback(() => {}, []);

  return (
    <div className={className}>
      <div className={'controls-container'}>
        <div className={'search-container'}>
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
        <div className={'filter-container'}>
          <Checkbox
            checked={filter === undefined}
            label={'All'}
            onChange={onCheckBoxChange('All')}
            size={'s'}
          />
          <Checkbox
            checked={!!filter?.owner}
            label={'Minted'}
            onChange={onCheckBoxChange('Minted')}
            size={'s'}
          />
          <Checkbox
            checked={!!filter?.admin}
            label={'Received'}
            onChange={onCheckBoxChange('Received')}
            size={'s'}
          />
        </div>
      </div>
      <div className={'items-count'}>{tokensCount || 0} items</div>
      <div className={'tokens-container'}>
        {tokens?.map &&
          tokens.map((token: Token) => (
            <TokenCard
              {...token}
              key={`token-${token.id}`}
            />))}
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
    </div>
  );
};

export default styled(TokensComponent)`
  .controls-container {
    display: flex;
    column-gap: var(--gap);
    align-items: center;
    justify-content: space-between;
    margin-top: var(--gap);
    .search-container {
      display: flex;
      column-gap: calc(var(--gap) / 2);
      align-items: center;
    }
    .filter-container {
      display: flex;
      column-gap: var(--gap);
      align-items: center;
    }
  }
  .items-count {
    margin: var(--gap) 0;
  }
  .tokens-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: var(--gap);
  }
`;
