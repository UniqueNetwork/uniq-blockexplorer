import React, { FC } from 'react';
import PagePaper from '../../components/PagePaper';
import TokensComponent from './components/TokensComponent';
import styled from 'styled-components';

const TokensPage: FC = () => {
  return (
    <>
      <Title>
        NFTs
      </Title>
      <PagePaper>
        <TokensComponent />
      </PagePaper>
    </>
  );
};

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
`;

export default TokensPage;
