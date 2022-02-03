import React, { FC, Reducer, useCallback, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Button } from '@unique-nft/ui-kit';

import { Token, tokens as gqlTokens } from '../../../api/graphQL';
import TokenCard from '../../../components/TokenCard';
import SearchComponent from '../../../components/SearchComponent';
import { useApi } from '../../../hooks/useApi';

interface TokensComponentProps {
  accountId: string
  pageSize?: number
}

type ActionType = 'All' | 'Minted' | 'Received'

const TokensComponent: FC<TokensComponentProps> = ({ accountId, pageSize = 10 }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

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

  const onClickSeeMore = useCallback(() => {
    navigate(`/${currentChain.network}/tokens`);
  }, [currentChain.network, navigate]);

  useEffect(() => {
    void fetchMoreTokens({
      filter,
      searchString
    });
  }, [searchString, filter, fetchMoreTokens]);

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
      </FilterWrapper>
    </ControlsWrapper>
    <ItemsCountWrapper>{tokensCount || 0} items</ItemsCountWrapper>
    <TokensWrapper>
      {tokens?.map &&
          tokens.map((token: Token) => (
            <TokenCard
              {...token}
              key={`token-${token.token_id}`}
            />))}
    </TokensWrapper>
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

const TokensWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: var(--gap);
`;

export default TokensComponent;
