import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from '@unique-nft/ui-kit';

import LastBlocksComponent from './components/LastBlocksComponent';
import NewTokensComponent from './components/NewTokensComponent';
import NewCollectionsComponent from './components/NewCollectionsComponent';

import { LastBlocks, LastTransfers } from './components';
import { SearchHeader } from './components/SearchHeader';
import { TokenInformation } from './components/TokenInformation';

const MainPage = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (
    <>
      <SearchHeader
        setSearchString={setSearchString}
      />
      <TokenInformation />
      <MainBlockWrapper>
        <LastBlocksComponent
          searchString={searchString}
        />
      </MainBlockWrapper>
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
        <Heading size={'2'}>New collections</Heading>
        <NewCollectionsComponent
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
`;

export default MainPage;
