import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { PagePaperWrapper, Stub } from '@app/components';
import { useQueryParams } from '@app/hooks/useQueryParams';

import {
  Collections,
  LastBlocks,
  LastTransfers,
  SearchHeader,
  TokenInformation,
  Tokens,
  Bundles,
} from './components';
import { CoinsTransfersSearchResult } from './components/LastTransfers/CoinsTransfersSearchResult';
import { NFTsTransfersSearchResult } from './components/LastTransfers/NFTsTransfersSearchResult';

const MainPage = () => {
  const [searchModeOn, setSearchModeOn] = useState<boolean>(false);
  const [resultsExist, setResultExist] = useState<boolean>(false);
  const [tokensExist, setTokensExist] = useState<boolean>(false);
  const [collectionsExist, setCollectionsExist] = useState<boolean>(false);
  const [transfersNftsExist, setTransfersNftsExist] = useState<boolean>(false);
  const [transfersCoinsExist, setTransfersCoinsExist] = useState<boolean>(false);
  const [blocksExist, setBlocksExist] = useState<boolean>(false);
  const isResultExist =
    tokensExist ||
    collectionsExist ||
    transfersNftsExist ||
    transfersCoinsExist ||
    blocksExist;

  const { searchString } = useQueryParams();

  useEffect(() => {
    setResultExist(isResultExist);
  }, [isResultExist]);

  useEffect(() => {
    setSearchModeOn(!!searchString && searchString !== '');
  }, [searchString]);

  return (
    <Wrapper>
      <SearchHeader searchModeOn={searchModeOn} setResultExist={setResultExist} />
      {!searchModeOn && <TokenInformation />}
      <Tokens
        searchModeOn={searchModeOn}
        searchString={searchString}
        setResultExist={setTokensExist}
      />
      <Bundles
        searchModeOn={searchModeOn}
        searchString={searchString}
        setResultExist={setTokensExist}
      />
      {searchModeOn ? (
        <>
          <CoinsTransfersSearchResult
            searchString={searchString}
            setResultExist={setTransfersCoinsExist}
          />
          <NFTsTransfersSearchResult
            searchString={searchString}
            setResultExist={setTransfersNftsExist}
          />
          <LastBlocks
            searchModeOn={searchModeOn}
            searchString={searchString}
            setResultExist={setBlocksExist}
          />
        </>
      ) : (
        <Main2BlocksWrapper>
          {!searchModeOn && <LastTransfers searchString={searchString} />}
          <LastBlocks searchModeOn={searchModeOn} searchString={searchString} />
        </Main2BlocksWrapper>
      )}
      <Collections
        searchModeOn={searchModeOn}
        searchString={searchString}
        setResultExist={setCollectionsExist}
      />
      {!resultsExist && searchModeOn && (
        <StubWrapper>
          {' '}
          <Stub />
        </StubWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  flex-grow: 1;
  grid-row-gap: var(--gap);
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

const StubWrapper = styled(PagePaperWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
