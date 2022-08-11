import { Skeleton } from '@unique-nft/ui-kit';
import React, { Suspense, useState } from 'react';
import styled from 'styled-components';

import { Collections, LastBlocks, LastTransfers, SearchHeader, Tokens } from './components';

const TokenInformation = React.lazy(()=>import('@app/pages/Main/components/TokenInformation/TokenInformation'));

const MainPage = () => {
  const [searchString, setSearchString] = useState<string | undefined>();

  return (
    <>
      <SearchHeader
        setSearchString={setSearchString}
      />
      <Suspense fallback={<Skeleton  
        height={'100%'}
        width={'100%'}
      />}
      >
        <TokenInformation />
      </Suspense>
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
