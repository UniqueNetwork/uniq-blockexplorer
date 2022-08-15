import React, { VFC } from 'react';
import styled from 'styled-components';

import { Header1 } from '@app/styles/styled-components';
import { deviceWidth, useApi } from '@app/hooks';
import SearchComponent from '@app/components/SearchComponent';

interface SearchHeaderProps {
  setSearchString: (searchString: string | undefined) => void;
}

export const SearchHeader: VFC<SearchHeaderProps> = ({ setSearchString }) => {
  const { currentChain } = useApi();

  const networkColor = `var(--${currentChain?.name?.replaceAll(' ', '-').toLowerCase()})`;
  const networkName =
    currentChain?.network.charAt(0) + currentChain?.network.slice(1).toLowerCase();

  return (
    <Wrapper>
      <H>
        Block Explorer&nbsp;
        <NetworkName networkColor={networkColor}>{networkName}</NetworkName>
      </H>
      <SearchComponent
        placeholder={'Extrinsic / collection / NFT / account'}
        onSearchChange={setSearchString}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: calc(var(--gap));

  @media ${deviceWidth.biggerThan.sm} {
    margin-bottom: calc(var(--gap) * 3);
  }
`;

const H = styled(Header1)`
  display: flex;
  margin-bottom: calc(var(--gap));

  @media ${deviceWidth.biggerThan.xs} {
    margin-bottom: calc(var(--gap) * 3 / 2);
  }

  @media ${deviceWidth.biggerThan.sm} {
    margin-top: calc(var(--gap) * 3);
    margin-bottom: calc(var(--gap) * 2);
  }

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const NetworkName = styled.span<{ networkColor: string }>`
  color: ${(props) => props.networkColor};
`;
