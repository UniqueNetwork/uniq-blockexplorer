import { Button, InputText } from '@unique-nft/ui-kit';
import { createRef, FC, useCallback, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { UserEvents } from '@app/analytics/user_analytics';
import { SVGIcon } from '@app/components/SVGIcon';
import { useApi } from '@app/hooks';
import ToolbarContext from '@app/toolbarContext/toolbarContext';
import { logUserEvents } from '@app/utils/logUserEvents';

interface SearchComponentProps {
  hideSearchButton?: boolean;
  placeholder?: string;
  onSearchChange(value: string | undefined): void;
  setResultExist?: (value: boolean) => void;
  searchRef?: React.RefObject<HTMLInputElement>;
}

let ref: React.RefObject<HTMLInputElement>;

const SearchComponent: FC<SearchComponentProps> = ({
  hideSearchButton,
  onSearchChange,
  placeholder,
  searchRef,
}) => {
  const { searchString, setSearchString, queryParams, setQueryParams } =
    useContext(ToolbarContext);

  const { pathname } = useLocation();
  ref = searchRef || createRef();

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
      navigate(`/${currentChain.network.toLowerCase()}/account/${searchString || ''}`);

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
      onSearchChange(value);
    },
    [setSearchString],
  );

  const clearSearch = () => {
    setSearchString(undefined);
    queryParams.delete('search');
    setQueryParams(queryParams);
  };

  return (
    <SearchWrapper className="global-search">
      <SearchInput
        iconLeft={{ name: 'magnify', size: 18 }}
        placeholder={placeholder}
        value={searchString}
        // @ts-ignore
        ref={ref}
        onChange={onChangeSearchString}
        onKeyDown={onSearchKeyDown}
      />
      {!!searchString && (
        <ClearSearch onClick={clearSearch}>
          <SVGIcon name="close" width={8} height={8} />
        </ClearSearch>
      )}
      {hideSearchButton && <Button role="primary" title="Search" onClick={onSearch} />}
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  height: 40px;
  position: relative;

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

const ClearSearch = styled.div`
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: 16px;
`;

export default SearchComponent;
