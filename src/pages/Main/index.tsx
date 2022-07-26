import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from '@unique-nft/ui-kit';

import NewTokensComponent from './components/NewTokensComponent';

import { Collections, LastBlocks, LastTransfers, SearchHeader, TokenInformation } from './components';

const MainPage = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (
    <>
      <SearchHeader
        setSearchString={setSearchString}
      />
      <TokenInformation />
      <MainBlockWrapper>
        <Heading size={'2'}>New NFTs</Heading>
        <NewTokensComponent
          searchString={searchString}
        />
      </MainBlockWrapper>
      <Main2BlocksWrapper>
        <LastTransfers
          searchString={searchString}
        />
        <LastBlocks
          searchString={searchString}
        />
      </Main2BlocksWrapper>
      <MainBlockWrapper>
        <Collections
          searchString={searchString}
        />
      </MainBlockWrapper>
    </>
  );
};

const MainBlockWrapper = styled.div`
  padding-top: calc(var(--gap) * 2);
`;

const Main2BlocksWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: var(--gap);

  @media (max-width: 1679px) {
    display: flex;
    flex-direction: column;
    grid-row-gap: var(--gap);
  }
`;

export default MainPage;
