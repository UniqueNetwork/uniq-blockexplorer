import React, { FC } from 'react';
import styled from 'styled-components';
import { ApolloQueryResult } from '@apollo/client';
import { Button, InputText } from '@unique-nft/ui-kit';

interface SearchComponentProps {
  placeholder?: string
  onChangeSearchString(value: string | undefined): void
  onSearchKeyDown({ key }: any): Promise<ApolloQueryResult<any>> | undefined | void
  onSearchClick(): void
}

const SearchComponent: FC<SearchComponentProps> = ({ onChangeSearchString, onSearchClick, onSearchKeyDown, placeholder }) => {
  return (
    <SearchContainer>
      <SearchInput
        iconLeft={{ name: 'magnify', size: 18 }}
        onChange={onChangeSearchString}
        onKeyDown={onSearchKeyDown}
        placeholder={placeholder}
      />
      <Button
        onClick={onSearchClick}
        role={'primary'}
        title='Search'
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: calc(var(--gap) * 2);

  @media (max-width: 767px) {
    width: 100%;
    button.unique-button {
      display: none;
    }
  }
`;

const SearchInput = styled(InputText)`
  box-sizing: border-box;
  width: 612px;
  margin-right: calc(var(--gap) / 2);

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0;
  }
`;

export default SearchComponent;
