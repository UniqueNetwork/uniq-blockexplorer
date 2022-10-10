import { Button, InputText } from '@unique-nft/ui-kit';
import { createRef, FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { useApi, useQueryParams } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

import { SVGIcon } from '.';

interface SearchComponentProps {
  placeholder?: string;
  onSearchChange(value: string | undefined): void;
  setResultExist?: (value: boolean) => void;
  hideSearchButton?: boolean;
  searchRef?: React.RefObject<HTMLInputElement>;
}

const SearchComponent: FC<SearchComponentProps> = ({
  onSearchChange,
  placeholder,
  setResultExist,
  hideSearchButton = false,
  searchRef,
}) => {
  const { searchString: searchFromQuery, setParamToQuery } = useQueryParams();
  const [inputValue, setInputValue] = useState<string | undefined>(searchFromQuery);
  const { pathname } = useLocation();

  const { currentChain } = useApi();

  const navigate = useNavigate();
  const ref = searchRef || createRef();

  const clearSearch = () => {
    setInputValue('');
    ref.current?.focus();
  };

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
      navigate(`/${currentChain.network.toLowerCase()}/account/${inputValue || ''}`);

      return;
    }

    // setParamToQuery('search', inputValue);

    onSearchChange(inputValue ? inputValue.trim() : inputValue);
  }, [
    pathname,
    inputValue,
    setParamToQuery,
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
        ref={ref}
        value={inputValue}
        onChange={onChangeSearchString}
        onKeyDown={onSearchKeyDown}
      />
      {!!inputValue && (
        <ClearSearch onClick={clearSearch}>
          <SVGIcon name="close" width={8} height={8} />
        </ClearSearch>
      )}
      {!hideSearchButton && <Button role="primary" title="Search" onClick={onSearch} />}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  height: 40px;

  @media (max-width: 767px) {
    width: 100%;

    button.unique-button {
      display: none;
    }
  }
`;

const ClearSearch = styled.div`
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: 16px;
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
