import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { Button, InputText } from '@unique-nft/ui-kit';
import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useApi } from '../hooks/useApi';

interface SearchComponentProps {
  placeholder?: string
  value?: string
  onSearchChange(value: string | undefined): void
}

const SearchComponent: FC<SearchComponentProps> = ({ onSearchChange, placeholder, value }) => {
  const [searchString, setSearchString] = useState<string | undefined>(value);

  const { currentChain } = useApi();

  const navigate = useNavigate();

  const onSearch = useCallback(() => {
    // ethers address
    if ((/0x[0-9A-Fa-f]{40}/g).test(searchString as string)) {
      const account = getMirrorFromEthersToSubstrate(searchString as string, 'quartz');

      navigate(`/${currentChain.network}/account/${account || ''}`);

      return;
    }

    // substrate address
    if ((/^\w{48}\w*$/.test(searchString || ''))) {
      navigate(`/${currentChain.network}/account/${searchString || ''}`);

      return;
    }

    if (/^\d+-\d+$/.test(searchString || '')) {
      navigate(`/${currentChain.network}/extrinsic/${searchString || ''}`);

      return;
    }

    onSearchChange(searchString);
  }, [currentChain.network, navigate, onSearchChange, searchString]);

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') return onSearch();
    },
    [onSearch]
  );

  const onChangeSearchString = useCallback((value: string | undefined) => {
    setSearchString(value?.toString() || '');
  }, [setSearchString]);

  return (
    <SearchWrapper>
      <SearchInput
        iconLeft={{ name: 'magnify', size: 18 }}
        onChange={onChangeSearchString}
        onKeyDown={onSearchKeyDown}
        placeholder={placeholder}
        value={searchString}
      />
      <Button
        onClick={onSearch}
        role={'primary'}
        title='Search'
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  margin-bottom: calc(var(--gap) * 2);
  width: 50%;
  @media (max-width: 767px) {
    margin-bottom: 24px;
    width: 100%;
    button.unique-button {
      display: none;
    }
  }
`;

const SearchInput = styled(InputText)`
  box-sizing: border-box;
  max-width: 612px;
  width: 100%;
  margin-right: calc(var(--gap) / 2);

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0;
  }
`;

export default SearchComponent;
