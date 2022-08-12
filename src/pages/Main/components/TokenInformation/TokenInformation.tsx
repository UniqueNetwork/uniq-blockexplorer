import { VFC } from 'react';
import styled from 'styled-components';

import { BodyM, BodyS, Header3, Header4 } from '@app/styles/styled-components';
import { PagePaperWrapper } from '@app/components/PagePaper';
import { useApi } from '@app/hooks';
import { formatLongNumber, getChainBackground } from '@app/utils';
import { useGraphQlStatistics } from '@app/api/graphQL/statistics';
import { Statistics } from '@app/api/graphQL/statistics/types';

export const TokenInformation: VFC = () => {
  const { currentChain } = useApi();
  const { statistics } = useGraphQlStatistics({ offset: 0, pageSize: 10 });
  const statisticsMap: { [name: string]: number } = {};

  statistics?.forEach((item: Statistics) => {
    statisticsMap[item.name] = item.count;
  });

  const totalSupply = statisticsMap.circulating_supply + statisticsMap.locked_supply;

  const totalSupplyPercentage = statisticsMap.circulating_supply && totalSupply
    ? (statisticsMap.circulating_supply * 100 / totalSupply).toFixed(1)
    : 0;
  const lockedSupplyPercentage = statisticsMap.locked_supply && totalSupply
    ? (statisticsMap.locked_supply * 100 / totalSupply).toFixed(1)
    : 0;

  return (
    <Wrapper chainLogo={getChainBackground(currentChain)}>
      <TokenInfo>
        <TokenInfoHeader>Token information <Small>All time</Small></TokenInfoHeader>
        <Body>
          { !!statisticsMap.holders && (
            <div>
              <BigAmount>{formatLongNumber(statisticsMap.holders)}</BigAmount>
              <P>Holders</P>
            </div>
          )}
          { !!totalSupply && (
            <div>
              <BigAmount>{formatLongNumber(totalSupply)}</BigAmount>
              <P>Total supply</P>
            </div>
          )}
          { !!totalSupplyPercentage && (
            <div>
              <BigAmount>{totalSupplyPercentage}% <Small>({ formatLongNumber(statisticsMap.circulating_supply) })</Small></BigAmount>
              <P>Circulating supply</P>
            </div>
          )}
          { !!lockedSupplyPercentage && (
            <div>
              <BigAmount>{lockedSupplyPercentage}% <Small>({ formatLongNumber(statisticsMap.locked_supply) })</Small></BigAmount>
              <P>Locked supply</P>
            </div>
          )}
        </Body>
      </TokenInfo>
      <TokenInfo>
        <TokenInfoHeader>Statistics <Small>All time</Small></TokenInfoHeader>
        <Body>
          <div>
            <BigLinkAmount>{statisticsMap?.blocks}</BigLinkAmount>
            <P>Blocks</P>
          </div>
          <div>
            <BigLinkAmount>{statisticsMap?.transfers}</BigLinkAmount>
            <P>Transfers</P>
          </div>
          <div>
            <BigLinkAmount>{statisticsMap?.tokens}</BigLinkAmount>
            <P>NFTs</P>
          </div>
          <div>
            <BigLinkAmount>{statisticsMap?.collections}</BigLinkAmount>
            <P>Collections</P>
          </div>
        </Body>
      </TokenInfo>
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)<{ chainLogo: string }>`
  font-family: 'Raleway';
  background-image: url(${(props) => props.chainLogo});
  background-repeat: no-repeat;
  background-position-x: calc(100% - calc(var(--gap) * 1.5));
  -ms-background-position-x: calc(100% - calc(var(--gap) * 1.5));
  background-position-y: calc(50% - var(--gap));
  -ms-background-position-y: calc(50% - var(--gap));
  
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-column-gap: var(--gap);
  
  small {
    color: var(--blue-grey-700);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }

  @media (max-width: 1199px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 575px) {
    display: grid;

    &:first-child {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: calc(var(--gap) * 1.5);

  @media (min-width: 576px) and (max-width: 1199px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    
    &:first-child {
      border-bottom: 1px solid var(--blue-gray-200);
      padding-bottom: var(--gap);
    }
    
    &:last-child {
      padding-top: var(--gap);
    }
  }

  @media (max-width: 575px) {
    display: grid;

    &:first-child {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`;

const TokenInfoHeader = styled(Header4)`
  display: flex;
  align-items: flex-end;
  grid-column-gap: calc(var(--gap) / 2);

  @media (max-width: 1199px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Small = styled(BodyS)`
  color: var(--blue-grey-700);
`;

const Body = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) * 2);
  align-items: center;
  justify-content: left;

  @media (max-width: 767px) {
    align-items: flex-start;
  }

  @media (max-width: 567px) {
    grid-column-gap: calc(var(--gap) * 1.5);
  }
`;

const P = styled(BodyM)`
  color: var(--blue-grey-700);
`;

const BigAmount = styled(Header3)`
  display: flex;
  align-items: flex-end;
  grid-column-gap: calc(var(--gap) / 4);
  min-height: 36px;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BigLinkAmount = styled(Header3)`
  color: var(--primary-500);
  min-height: 36px;
`;
