import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading } from '@unique-nft/ui-kit';

import { useApi } from '../../hooks/useApi';
import LastTransfersComponent from './components/LastTransfersComponent';
import LastBlocksComponent from './components/LastBlocksComponent';
import NewTokensComponent from './components/NewTokensComponent';
import NewCollectionsComponent from './components/NewCollectionsComponent';
import SearchComponent from '../../components/SearchComponent';

const MainPage = () => {
  const [searchString, setSearchString] = useState<string | undefined>();
  const { chainData } = useApi();

  return (
    <>
      <SearchComponent
        onSearchChange={setSearchString}
        placeholder={'Collection / account'}
      />
      <MainBlockWrapper>
        <Heading size={'2'}>Latest blocks</Heading>
        <LastBlocksComponent
          searchString={searchString}
        />
      </MainBlockWrapper>
      <MainBlockWrapper>
        <Heading size={'2'}>New tokens</Heading>
        <NewTokensComponent
          searchString={searchString}
        />
      </MainBlockWrapper>
      <MainBlockWrapper>
        <Heading size={'2'}>{`Last ${chainData?.properties.tokenSymbol || ''} transfers`}</Heading>
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
    </>
  );
};

const MainBlockWrapper = styled.div`
  padding-top: calc(var(--gap) * 2);
`;

export default MainPage;
