import React, { VFC } from 'react';
import styled from 'styled-components';

import { DeviceSizes, useApi } from '@app/hooks';
import { getChainColor } from '@app/utils';

interface MainHeaderProps {
  searchModeOn: boolean;
  searchString?: string;
}

export const MainHeader: VFC<MainHeaderProps> = ({ searchModeOn, searchString }) => {
  const { currentChain } = useApi();
  const networkColor = getChainColor(currentChain);
  const networkName =
    currentChain?.network === 'UNIQUE'
      ? currentChain.name
      : currentChain?.network.charAt(0) + currentChain?.network.slice(1).toLowerCase();

  return (
    <Wrapper data-automation-id="main-header">
      {searchModeOn ? (
        <H>
          Search results&nbsp;"<SearchString>{searchString}</SearchString>"
        </H>
      ) : (
        <H>
          <span>Block Explorer&nbsp;</span>
          <NetworkName networkColor={networkColor}>{networkName}</NetworkName>
        </H>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  margin: calc(120px - var(--gap)) 0;

  @media (max-width: ${DeviceSizes.md}) {
    margin: 40px 0;
  }
`;

const H = styled.div`
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 64px;
  line-height: 72px;
  margin: 0;
  text-align: center;
  word-break: break-word;

  span {
    white-space: nowrap;
  }

  @media (max-width: ${DeviceSizes.sm}) {
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
  }
`;

const NetworkName = styled.span<{ networkColor: string }>`
  color: var(${(props) => props.networkColor});
`;

const SearchString = styled.span`
  font-family: Inter;
  color: var(--primary-500);
`;
