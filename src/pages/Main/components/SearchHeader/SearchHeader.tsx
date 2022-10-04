import React, { VFC } from 'react';
import styled from 'styled-components/macro';

import { Header1 } from '@app/styles/styled-components';
import { deviceWidth, useApi } from '@app/hooks';
import { getChainColor } from '@app/utils';
import SearchComponent from '@app/components/SearchComponent';

interface SearchHeaderProps {
  searchModeOn: boolean;
  setResultExist?: (value: boolean) => void;
  setSearchString: (searchString: string | undefined) => void;
  searchString?: string;
}

export const SearchHeader: VFC<SearchHeaderProps> = ({
  searchModeOn,
  searchString,
  setSearchString,
  setResultExist,
}) => {
  const { currentChain } = useApi();
  const networkColor = getChainColor(currentChain);
  const networkName =
    currentChain?.network === 'UNIQUE'
      ? currentChain.name
      : currentChain?.network.charAt(0) + currentChain?.network.slice(1).toLowerCase();

  return (
    <Wrapper data-automation-id="search-header">
      {searchModeOn ? (
        <H>
          Search results&nbsp;"<SearchString>{searchString}</SearchString>"
        </H>
      ) : (
        <H>
          Block Explorer&nbsp;
          <NetworkName networkColor={networkColor}>{networkName}</NetworkName>
        </H>
      )}
      <SearchComponent
        placeholder="Extrinsic / collection / NFT / account"
        setResultExist={setResultExist}
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

  @media ${deviceWidth.smallerThan.md} {
    font-size: 24px;
    line-height: 36px;
    font-weight: 700;
  }

  @media ${deviceWidth.biggerThan.xs} {
    margin-bottom: calc(var(--gap) * 3 / 2);
  }

  @media ${deviceWidth.biggerThan.sm} {
    margin-top: calc(var(--gap) * 3);
    margin-bottom: calc(var(--gap) * 2);
  }
`;

const NetworkName = styled.span<{ networkColor: string }>`
  color: var(${(props) => props.networkColor});
`;

const SearchString = styled.span`
  font-family: Inter;
  color: var(--primary-500);
`;
