import React, { FC } from 'react';
import styled from 'styled-components';

import { useScrollToTop } from '@app/hooks';

import PagePaper from '../../components/PagePaper';
import TokensComponent from './components/TokensComponent';

const TokensPage: FC = () => {
  useScrollToTop();

  return (
    <>
      <Title>NFTs</Title>
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
