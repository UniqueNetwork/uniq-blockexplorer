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

  const { fetchMoreTokens, tokens, tokensCount } = gqlTokens.useGraphQlTokens({ filter: {
    owner: { _eq: accountId }
  },
  pageSize });

  const onClickSeeMore = useCallback(() => {
    navigate(`/${currentChain.network}/tokens`);
  }, [currentChain.network, navigate]);

  const onSearch = useCallback((searchString: string) => {
    void fetchMoreTokens({
      filter: {
        owner: { _eq: accountId }
      },
      searchString
    });
  }, [accountId, fetchMoreTokens]);

  return (<>
    <ControlsWrapper>
      <SearchComponent
        onSearchChange={onSearch}
        placeholder={'NFT / collection'}
      />
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

const ItemsCountWrapper = styled.div`
  margin: var(--gap) 0;
`;

const TokensWrapper = styled.div`

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: calc(var(--gap) * 1.5);
  grid-row-gap: calc(var(--gap) * 1.5);
  margin-bottom: calc(var(--gap) * 1.5);

  @media(max-width: 1279px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media(max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media(max-width: 567px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media(max-width: 319px) {
    grid-template-columns: 1fr;
  }
`;

export default TokensComponent;
