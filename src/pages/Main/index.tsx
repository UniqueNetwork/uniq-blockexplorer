import { Skeleton } from '@unique-nft/ui-kit';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Collections, LastBlocks, LastTransfers, SearchHeader, TokenInformation, Tokens } from './components';

const MainPage = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (
    <>
      <SearchHeader
        setSearchString={setSearchString}
      />
      <TokenInformation />
      <div>
        <Tokens
          searchString={searchString}
        />
      </div>
      <Main2BlocksWrapper>
        <LastTransfers
          searchString={searchString}
        />
        <LastBlocks
          searchString={searchString}
        />
      </Main2BlocksWrapper>
      <div>
        <Collections
          searchString={searchString}
        />
      </div>
    </>
  );
};

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
