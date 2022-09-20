import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { PagePaperWrapper, Stub } from '@app/components';
import { useSearchFromQuery } from '@app/hooks';

import {
  Collections,
  LastBlocks,
  LastTransfers,
  MainHeader,
  TokenInformation,
  Tokens,
} from './components';
import { CoinsTransfersSearchResult } from './components/LastTransfers/CoinsTransfersSearchResult';
import { NFTsTransfersSearchResult } from './components/LastTransfers/NFTsTransfersSearchResult';

const MainPage = () => {
  const { searchString, setSearchString } = useSearchFromQuery();
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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setResultExist(isResultExist);
  }, [isResultExist]);

  useEffect(() => {
    setSearchModeOn(!!searchString && searchString !== '');
  }, [searchString]);

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchString(decodeURI(searchParams.get('search') as string));
    } else setSearchString('');
  }, [searchParams, setSearchString]);

  return (
    <Wrapper>
      <MainHeader searchModeOn={searchModeOn} searchString={searchString} />
      {!searchModeOn && <TokenInformation />}
      <Tokens
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
