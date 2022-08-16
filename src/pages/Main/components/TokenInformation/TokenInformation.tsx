import { VFC } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@unique-nft/ui-kit';

import { BodyM, BodyS, Header3, Header4 } from '@app/styles/styled-components';
import { PagePaperWrapper } from '@app/components/PagePaper';
import { deviceWidth, useApi } from '@app/hooks';
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

  const circulatingSupplyPercentage = !!(statisticsMap.circulating_supply && totalSupply)
    ? ((statisticsMap.circulating_supply * 100) / totalSupply).toFixed(1)
    : 0;

  const lockedSupplyPercentage = !!(statisticsMap.locked_supply && totalSupply)
    ? ((statisticsMap.locked_supply * 100) / totalSupply).toFixed(1)
    : 0;

  if (!statistics) {
    return (
      <SkeletonWrapper>
        <Skeleton />
      </SkeletonWrapper>
    );
  }

  return (
    <Wrapper chainLogo={getChainBackground(currentChain)}>
      <TokenInfo>
        <TokenInfoHeader>
          Token information <Small>All time</Small>
        </TokenInfoHeader>
        <Body>
          {!!statisticsMap.holders && (
            <div>
              <BigAmount>{statisticsMap.holders}</BigAmount>
              <P>Holders</P>
            </div>
          )}
          {!!totalSupply && (
            <div>
              <BigAmount>{formatLongNumber(totalSupply)}</BigAmount>
              <P>Total supply</P>
            </div>
          )}
          {!!circulatingSupplyPercentage && (
            <div>
              <BigAmount>
                {circulatingSupplyPercentage}%{' '}
                <SmallDesktop>
                  ({formatLongNumber(statisticsMap.circulating_supply)})
                </SmallDesktop>
              </BigAmount>
              <P>Circulating&nbsp;supply</P>
            </div>
          )}
          {!!lockedSupplyPercentage && (
            <div>
              <BigAmount>
                {lockedSupplyPercentage}%{' '}
                <SmallDesktop>
                  ({formatLongNumber(statisticsMap.locked_supply)})
                </SmallDesktop>
              </BigAmount>
              <P>Locked&nbsp;supply</P>
            </div>
          )}
        </Body>
      </TokenInfo>
      <TokenInfo>
        <TokenInfoHeader>
          Statistics <Small>All time</Small>
        </TokenInfoHeader>
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

const SkeletonWrapper = styled(PagePaperWrapper)`
  padding: 0;

  .unique-skeleton {
    border-radius: var(--gap) !important;
  }

  @media ${deviceWidth.biggerThan.lg} {
    min-height: 160px;
    max-height: 160px;

    .unique-skeleton {
      height: 160px !important;
    }
  }

  @media ${deviceWidth.smallerThan.xl} {
    min-height: 201px;
    max-height: 201px;

    .unique-skeleton {
      height: 201px !important;
    }
  }

  @media ${deviceWidth.smallerThan.sm} {
    min-height: 316px;
    max-height: 316px;

    .unique-skeleton {
      height: 316px !important;
    }
  }
`;

const Wrapper = styled(PagePaperWrapper)<{ chainLogo: string }>`
  font-family: 'Raleway';
  background-image: url(${(props) => props.chainLogo});
  background-repeat: no-repeat;
  background-position-x: calc(100% - calc(var(--gap) * 1.5));
  -ms-background-position-x: calc(100% - calc(var(--gap) * 1.5));
  background-position-y: calc(50% - var(--gap));
  -ms-background-position-y: calc(50% - var(--gap));

  display: flex;
  justify-content: space-between;

  small {
    color: var(--blue-grey-700);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }

  @media ${deviceWidth.smallerThan.xl} {
    display: flex;
    flex-direction: column;
  }

  @media ${deviceWidth.smallerThan.sm} {
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

  @media ${deviceWidth.biggerThan.xs} and ${deviceWidth.smallerThan.xl} {
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

  @media ${deviceWidth.smallerThan.sm} {
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

  @media ${deviceWidth.smallerThan.xl} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Small = styled(BodyS)`
  color: var(--blue-grey-700);
`;

const SmallDesktop = styled(Small)`
  @media ${deviceWidth.smallerThan.md} {
    display: none;
  }
`;

const Body = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) * 2);
  align-items: center;
  justify-content: left;

  @media ${deviceWidth.smallerThan.md} {
    align-items: flex-start;
  }

  @media ${deviceWidth.smallerThan.sm} {
    grid-column-gap: var(--gap);
  }
`;

const P = styled(BodyM)`
  color: var(--blue-grey-700);
  word-break: break-word;
`;

const BigAmount = styled(Header3)`
  display: flex;
  align-items: baseline;
  grid-column-gap: calc(var(--gap) / 4);
  min-height: 36px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;

  @media ${deviceWidth.smallerThan.lg} {
    font-size: 20px;
    line-height: 28px;
  }

  @media ${deviceWidth.smallerThan.md} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BigLinkAmount = styled(Header3)`
  font-family: 'Inter';
  color: var(--primary-500);
  min-height: 36px;

  @media ${deviceWidth.smallerThan.lg} {
    font-size: 20px;
    line-height: 28px;
  }
`;
