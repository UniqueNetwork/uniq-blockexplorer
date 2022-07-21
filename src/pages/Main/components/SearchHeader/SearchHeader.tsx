import React, { VFC } from 'react';
import styled from 'styled-components';
import { Header1 } from '@app/styles/styled-components';
import { useApi } from '@app/hooks';
import SearchComponent from '@app/components/SearchComponent';

interface SearchHeaderProps {
  setSearchString: (searchString: string | undefined) => void;
}

export const SearchHeader: VFC<SearchHeaderProps> = ({ setSearchString }) => {
  const { currentChain } = useApi();

  const networkColor = `var(--${currentChain?.name?.replaceAll(' ', '-').toLowerCase()})`;

  return (
    <Wrapper>
      <H>
        Block Explorer&nbsp;<NetworkName networkColor={networkColor}>{currentChain?.name}</NetworkName>
      </H>
      <SearchComponent
        onSearchChange={setSearchString}
        placeholder={'Extrinsic / collection / NFT / account'}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 767px) {
    align-items: flex-start;
  }
`;

const H = styled(Header1)`
  display: flex;
  margin-bottom: calc(var(--gap) * 2);
`;

const NetworkName = styled.span<{ networkColor: string }>`
  color: ${(props) => props.networkColor};
`;
