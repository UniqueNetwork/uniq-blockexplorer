import { Button, InputText } from '@unique-nft/ui-kit';
import { createRef, FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Address } from '@unique-nft/utils';

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
  const { searchString: searchFromQuery } = useQueryParams();
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
    if (Address.is.validAddressInAnyForm(inputValue?.trim() || '')) {
      navigate(`/${currentChain.network.toLowerCase()}/account/${inputValue || ''}`);

      return;
    }

    onSearchChange(inputValue ? inputValue.trim() : inputValue);
  }, [pathname, inputValue, onSearchChange, navigate, currentChain.network]);

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
      <InputWrapper>
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
      </InputWrapper>
      {!hideSearchButton && <Button role="primary" title="Search" onClick={onSearch} />}
    </SearchWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-right: calc(var(--gap) / 2);
  @media (max-width: 767px) {
    margin-right: 0;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
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
  right: 12px;
  top: 16px;
`;

const SearchInput = styled(InputText)`
  box-sizing: border-box;
  width: 100%;
  background-color: var(--white-color);
  & .input-wrapper.with-icon.to-left input {
    padding: 11px 25px 11px 0px;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0;
  }
`;

export default SearchComponent;
