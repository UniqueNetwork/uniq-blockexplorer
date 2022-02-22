import React, { FC } from 'react';

import TokensComponent from './components/TokensComponent';
import PagePaper from '../../components/PagePaper';

const TokensPage: FC = () => {
  return (
    <PagePaper>
      <TokensComponent />
    </PagePaper>
  );
};

export default TokensPage;
