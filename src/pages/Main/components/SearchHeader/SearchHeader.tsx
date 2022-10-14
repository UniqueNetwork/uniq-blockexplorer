import React, { VFC } from 'react';
import styled from 'styled-components/macro';

import { Header1 } from '@app/styles/styled-components';
import { deviceWidth, useApi, useQueryParams } from '@app/hooks';
import { getChainColor } from '@app/utils';
import SearchComponent from '@app/components/SearchComponent';

interface SearchHeaderProps {
  searchModeOn: boolean;
  setResultExist?: (value: boolean) => void;
}

export const SearchHeader: VFC<SearchHeaderProps> = ({
  searchModeOn,
  setResultExist,
}) => {
  const { currentChain } = useApi();
  const { searchString, setParamToQuery } = useQueryParams();
  const networkColor = getChainColor(currentChain);
  const networkName =
    currentChain?.network === 'UNIQUE'
      ? currentChain.name
      : currentChain?.network.charAt(0) + currentChain?.network.slice(1).toLowerCase();

  const onSearchChange = (value: string) => {
    setParamToQuery([{ name: 'search', value }]);
  };
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
      <SearchWrapper>
        <SearchComponent
          placeholder="Extrinsic / collection / NFT / account"
          setResultExist={setResultExist}
          onSearchChange={onSearchChange}
        />
      </SearchWrapper>
    </Wrapper>
  );
};

const SearchWrapper = styled.div`
  max-width: 561px;
  width: 100%;
`;

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
