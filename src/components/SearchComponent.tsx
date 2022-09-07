import { Button, InputText } from '@unique-nft/ui-kit';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useApi, useSearchFromQuery } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

interface SearchComponentProps {
  placeholder?: string;
  value?: string;
  onSearchChange(value: string | undefined): void;
  setResultExist?: (value: boolean) => void;
}

const SearchComponent: FC<SearchComponentProps> = ({
  onSearchChange,
  placeholder,
  setResultExist,
  value,
}) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const searchFromQuery = useSearchFromQuery();
  const [inputValue, setInputValue] = useState<string | undefined>(searchFromQuery);
  const { pathname } = useLocation();

  const { currentChain } = useApi();

  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(searchFromQuery);
  }, [searchFromQuery]);

  const onSearch = useCallback(() => {
    if (pathname.includes('tokens')) {
      logUserEvents(UserEvents.Click.SEARCH_BUTTON_ON_NFTS_PAGE);
    } else if (pathname.includes('collections')) {
      logUserEvents(UserEvents.Click.SEARCH_BUTTON_ON_COLLECTIONS_PAGE);
    } else if (pathname.includes('account')) {
      logUserEvents(UserEvents.Click.SEARCH_BUTTON_ON_ACCOUNT_PAGE);
    } else {
      logUserEvents(UserEvents.Click.SEARCH_BUTTON_ON_MAIN_PAGE);
    }

    // ethers address or substrate address
    if (
      /0x[0-9A-Fa-f]{40}/g.test(inputValue || '') ||
      /^\w{48}\w*$/.test(inputValue || '')
    ) {
      navigate(`/${currentChain.network}/account/${inputValue || ''}`);

      return;
    }

    //temporary for search page
    if (!!inputValue && inputValue !== '' && setResultExist) {
      setResultExist(false);
    }
    if (inputValue) {
      queryParams.set('search', inputValue);
    } else {
      queryParams.delete('search');
    }
    setQueryParams(queryParams);

    onSearchChange(inputValue ? inputValue.trim() : inputValue);
  }, [
    pathname,
    inputValue,
    setResultExist,
    setQueryParams,
    queryParams,
    onSearchChange,
    navigate,
    currentChain.network,
  ]);

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') return onSearch();
    },
    [onSearch],
  );

  const onChangeSearchString = useCallback(
    (value: string | undefined) => {
      setInputValue(value?.toString() || '');
    },
    [setInputValue],
  );

  return (
    <SearchWrapper>
      <SearchInput
        iconLeft={{ name: 'magnify', size: 18 }}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChangeSearchString}
        onKeyDown={onSearchKeyDown}
      />
      <Button role={'primary'} title="Search" onClick={onSearch} />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;

  @media (max-width: 767px) {
    width: 100%;

    button.unique-button {
      display: none;
    }
  }
`;

const SearchInput = styled(InputText)`
  box-sizing: border-box;
  width: 418px;
  margin-right: calc(var(--gap) / 2);
  background-color: var(--white-color);

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0;
  }
`;

export default SearchComponent;
