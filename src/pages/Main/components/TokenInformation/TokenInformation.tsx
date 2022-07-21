import { VFC } from 'react';
import styled from 'styled-components';
import { BodyM, BodyS, Header3, Header4 } from '@app/styles/styled-components';
import unique from '../../../../logos/unique.svg';

import { PagePaperWrapper } from '@app/components/PagePaper';

export const TokenInformation: VFC = () => {
  return (
    <Wrapper>
      <TokenInfo>
        <TokenInfoHeader>Token information <Small>All time</Small></TokenInfoHeader>
        <Body>
          <div>
            <BigAmount>11,847</BigAmount>
            <P>Holders</P>
          </div>
          <div>
            <BigAmount>806,998М</BigAmount>
            <P>Total supply</P>
          </div>
          <div>
            <BigAmount>22,9% <Small>(239,707M)</Small></BigAmount>
            <P>Circulating supply</P>
          </div>
          <div>
            <BigAmount>77,1% <Small>(807,757M)</Small></BigAmount>
            <P>Locked supply</P>
          </div>
        </Body>
      </TokenInfo>
      <TokenInfo>
        <TokenInfoHeader>Statistics <Small>All time</Small></TokenInfoHeader>
        <Body>
          <div>
            <BigLinkAmount>949,768</BigLinkAmount>
            <P>Blocks</P>
          </div>
          <div>
            <BigLinkAmount>26,025</BigLinkAmount>
            <P>Transfers</P>
          </div>
          <div>
            <BigLinkAmount>949,097</BigLinkAmount>
            <P>NFTs</P>
          </div>
          <div>
            <BigLinkAmount>310</BigLinkAmount>
            <P>Collections</P>
          </div>
        </Body>
      </TokenInfo>
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  font-family: 'Raleway';
  background-image: url(${unique});
  background-repeat: no-repeat;
  background-position-x: calc(100% - calc(var(--gap) * 1.5));
  -ms-background-position-x: calc(100% - calc(var(--gap) * 1.5));
  
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
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: calc(var(--gap) * 1.5);
`;
const TokenInfoHeader = styled(Header4)`
  display: flex;
  align-items: flex-end;
  grid-column-gap: calc(var(--gap) / 2);
`;
const Small = styled(BodyS)`
  color: var(--blue-grey-700);
`;
const Body = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) * 2);
  align-items: center;
  justify-content: left;
`;
const P = styled(BodyM)`
  color: var(--blue-grey-700);
`;

const BigAmount = styled(Header3)`
  display: flex;
  align-items: flex-end;
  grid-column-gap: calc(var(--gap) / 4);
`;

const BigLinkAmount = styled(Header3)`
  color: var(--primary-500);
`;
