import { Button, InputText } from '@unique-nft/ui-kit';
import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useApi, useSearchFromQuery } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

interface SearchComponentProps {
  hideSearchButton?: boolean;
  placeholder?: string;
  onSearchChange(value: string | undefined): void;
  setResultExist?: (value: boolean) => void;
}

const SearchComponent: FC<SearchComponentProps> = ({
  hideSearchButton,
  onSearchChange,
  placeholder,
  setResultExist,
}) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const { searchString, setSearchString } = useSearchFromQuery();
  const { pathname } = useLocation();

  const { currentChain } = useApi();

  const navigate = useNavigate();

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
      /0x[0-9A-Fa-f]{40}/g.test(searchString || '') ||
      /^\w{48}\w*$/.test(searchString || '')
    ) {
      navigate(`/${currentChain.network}/account/${searchString || ''}`);

      return;
    }

    if (searchString) {
      queryParams.set('search', searchString);
    } else {
      queryParams.delete('search');
    }

    setQueryParams(queryParams);

    onSearchChange(searchString ? searchString.trim() : searchString);
  }, [
    pathname,
    searchString,
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
      setSearchString(value?.toString() || '');
    },
    [setSearchString],
  );

  return (
    <SearchWrapper>
      <SearchInput
        iconLeft={{ name: 'magnify', size: 18 }}
        placeholder={placeholder}
        value={searchString}
        onChange={onChangeSearchString}
        onKeyDown={onSearchKeyDown}
      />
      {hideSearchButton && <Button role="primary" title="Search" onClick={onSearch} />}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  height: 40px;

  @media (max-width: 767px) {
    width: 100%;

    button.unique-button {
      display: none;
    }
  }
`;

const SearchInput = styled(InputText)`
  box-sizing: border-box;
  width: 450px;
  margin-right: calc(var(--gap) / 2);
  background-color: var(--white-color);

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0;
  }
`;

export default SearchComponent;
