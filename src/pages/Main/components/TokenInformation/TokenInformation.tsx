import { VFC } from 'react';
import styled from 'styled-components/macro';
import { Skeleton } from '@unique-nft/ui-kit';

import { BodyM, BodyS, Header3, Header4 } from '@app/styles/styled-components';
import { PagePaperWrapper } from '@app/components/PagePaper';
import { deviceWidth, useApi } from '@app/hooks';
import { formatLongNumber, getChainBackground, getChainColor } from '@app/utils';
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
    <Wrapper
      chainLogo={getChainBackground(currentChain)}
      data-automation-id="token-information"
    >
      <TokenInfo>
        <TokenInfoHeader>
          Token information <Small>All time</Small>
        </TokenInfoHeader>
        <Body>
          {!!statisticsMap.holders && (
            <Cell>
              <BigAmount>{formatLongNumber(statisticsMap.holders)}</BigAmount>
              <P>Holders</P>
            </Cell>
          )}
          {!!totalSupply && (
            <Cell>
              <BigAmount>{formatLongNumber(totalSupply)}</BigAmount>
              <P>Total supply</P>
            </Cell>
          )}
          {'circulating_supply' in statisticsMap && (
            <Cell>
              <BigAmount>
                {circulatingSupplyPercentage}%{' '}
                <SmallDesktop>
                  ({formatLongNumber(statisticsMap.circulating_supply)})
                </SmallDesktop>
              </BigAmount>
              <P>Circulating supply</P>
            </Cell>
          )}
          {'locked_supply' in statisticsMap && (
            <Cell>
              <BigAmount>
                {lockedSupplyPercentage}%{' '}
                <SmallDesktop>
                  ({formatLongNumber(statisticsMap.locked_supply)})
                </SmallDesktop>
              </BigAmount>
              <P>Locked supply</P>
            </Cell>
          )}
        </Body>
      </TokenInfo>
      <TokenInfo>
        <TokenInfoHeader>
          Statistics <Small>All time</Small>
        </TokenInfoHeader>
        <Body>
          <Cell>
            <BigLChainAmount chainColor={getChainColor(currentChain)}>
              {formatLongNumber(statisticsMap?.blocks)}
            </BigLChainAmount>
            <P>Blocks</P>
          </Cell>
          <Cell>
            <BigLChainAmount chainColor={getChainColor(currentChain)}>
              {formatLongNumber(statisticsMap?.transfers)}
            </BigLChainAmount>
            <P>Transfers</P>
          </Cell>
          <Cell>
            <BigLChainAmount chainColor={getChainColor(currentChain)}>
              {formatLongNumber(statisticsMap?.tokens)}
            </BigLChainAmount>
            <P>NFTs</P>
          </Cell>
          <Cell>
            <BigLChainAmount chainColor={getChainColor(currentChain)}>
              {formatLongNumber(statisticsMap?.collections)}
            </BigLChainAmount>
            <P>Collections</P>
          </Cell>
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

  @media ${deviceWidth.smallerThan.md} {
    min-height: 177px;
    max-height: 177px;

    .unique-skeleton {
      height: 177px !important;
    }
  }

  @media ${deviceWidth.smallerThan.sm} {
    min-height: 269px;
    max-height: 269px;

    .unique-skeleton {
      height: 269px !important;
    }
  }

  @media ${deviceWidth.smallerThan.xs} {
    min-height: 287px;
    max-height: 287px;

    .unique-skeleton {
      height: 287px !important;
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
  grid-column-gap: calc(var(--gap) * 4);
  justify-content: flex-start;

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

  @media ${deviceWidth.smallerThan.xl} {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: var(--gap);
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
    display: flex;
    flex-direction: column;
  }
`;

const TokenInfoHeader = styled(Header4)`
  display: flex;
  align-items: baseline;
  grid-column-gap: calc(var(--gap) / 2);

  @media ${deviceWidth.smallerThan.xl} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media ${deviceWidth.smallerThan.md} {
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
  }

  @media ${deviceWidth.smallerThan.sm} {
    flex-direction: row;
    align-items: baseline;
  }
`;

const Small = styled(BodyS)`
  color: var(--blue-grey-700);
`;

const SmallDesktop = styled(Small)`
  color: var(--blue-grey-700);

  @media ${deviceWidth.smallerThan.md} {
    display: none;
  }
`;

const Body = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) * 2);
  align-items: flex-start;
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

  @media ${deviceWidth.smallerThan.md} {
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
  }
`;

const BigAmount = styled(Header3)`
  display: flex;
  align-items: baseline;
  grid-column-gap: calc(var(--gap) / 4);
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 4px;

  @media ${deviceWidth.smallerThan.lg} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 20px;
    line-height: 28px;
  }

  @media ${deviceWidth.smallerThan.md} {
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
  }
`;

const BigLChainAmount = styled(Header3)<{ chainColor: string }>`
  font-family: 'Inter';
  color: var(${(props) => props.chainColor});
  line-height: 36px;
  margin-bottom: 4px;

  @media ${deviceWidth.smallerThan.lg} {
    font-size: 20px;
    line-height: 28px;
  }

  @media ${deviceWidth.smallerThan.md} {
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
