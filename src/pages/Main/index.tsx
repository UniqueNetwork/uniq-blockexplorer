import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from '@unique-nft/ui-kit';

import LastTransfersComponent from './components/LastTransfersComponent';
import LastBlocksComponent from './components/LastBlocksComponent';
import NewTokensComponent from './components/NewTokensComponent';
import NewCollectionsComponent from './components/NewCollectionsComponent';
import SearchComponent from '../../components/SearchComponent';
import PagePaper from '../../components/PagePaper';

const MainPage = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (
    <PagePaper>
      <SearchComponent
        onSearchChange={setSearchString}
        placeholder={'Extrinsic / collection / NFT / account'}
      />
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
      <MainBlockWrapper>
        <LastTransfersComponent
          searchString={searchString}
        />
      </MainBlockWrapper>
      <MainBlockWrapper>
        <Heading size={'2'}>New collections</Heading>
        <NewCollectionsComponent
          searchString={searchString}
        />
      </MainBlockWrapper>
    </PagePaper>
  );
};

const MainBlockWrapper = styled.div`
  padding-top: calc(var(--gap) * 2);
`;

export default MainPage;
