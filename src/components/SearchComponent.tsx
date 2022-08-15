import { Button, InputText } from '@unique-nft/ui-kit';
import { FC, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useApi } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

interface SearchComponentProps {
  placeholder?: string;
  value?: string;
  onSearchChange(value: string | undefined): void;
}

const SearchComponent: FC<SearchComponentProps> = ({
  onSearchChange,
  placeholder,
  value,
}) => {
  const [searchString, setSearchString] = useState<string | undefined>(value);
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

    if (/^\d+-\d+$/.test(searchString || '')) {
      navigate(`/${currentChain.network}/extrinsic/${searchString || ''}`);

      return;
    }

    onSearchChange(searchString ? searchString.trim() : searchString);
  }, [currentChain.network, navigate, onSearchChange, pathname, searchString]);

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
