import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { PagePaperWrapper, Stub } from '@app/components';

import {
  Collections,
  LastBlocks,
  LastTransfers,
  SearchHeader,
  TokenInformation,
  Tokens,
} from './components';
import { CoinsTransfersSearchResult } from './components/LastTransfers/CoinsTransfersSearchResult';
import { NFTsTransfersSearchResult } from './components/LastTransfers/NFTsTransfersSearchResult';

const MainPage = () => {
  const [searchModeOn, setSearchModeOn] = useState<boolean>(false);
  const [resultsExist, setResultExist] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const [searchString, setSearchString] = useState<string | undefined>(
    searchParams.get('search') || '',
  );

  useEffect(() => {
    setSearchModeOn(!!searchString && searchString !== '');
  }, [searchString]);

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchString(decodeURI(searchParams.get('search') as string));
    } else setSearchString('');
  }, [searchParams]);

  return (
    <Wrapper>
      <SearchHeader
        searchModeOn={searchModeOn}
        searchString={searchString}
        setSearchString={setSearchString}
        setResultExist={setResultExist}
      />
      {!searchModeOn && <TokenInformation />}
      <Tokens
        searchModeOn={searchModeOn}
        searchString={searchString}
        setResultExist={setResultExist}
      />
      {searchModeOn ? (
        <>
          <CoinsTransfersSearchResult
            searchString={searchString}
            setResultExist={setResultExist}
          />
          <NFTsTransfersSearchResult
            searchString={searchString}
            setResultExist={setResultExist}
          />
          <LastBlocks
            searchModeOn={searchModeOn}
            searchString={searchString}
            setResultExist={setResultExist}
          />
        </>
      ) : (
        <Main2BlocksWrapper>
          {!searchModeOn && <LastTransfers searchString={searchString} />}
          <LastBlocks
            searchModeOn={searchModeOn}
            searchString={searchString}
            setResultExist={setResultExist}
          />
        </Main2BlocksWrapper>
      )}
      <Collections
        searchModeOn={searchModeOn}
        searchString={searchString}
        setResultExist={setResultExist}
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
