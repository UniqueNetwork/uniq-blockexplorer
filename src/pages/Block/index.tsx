import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useScrollToTop } from '@app/hooks';

import BlockDetailComponent from './components/BlockDetailComponent';
import PagePaper from '../../components/PagePaper';

const BlockPage: FC = () => {
  useScrollToTop();
  const { blockIndex } = useParams();

  return (
    <PagePaper>
      <BlockDetailComponent blockNumber={blockIndex} />
    </PagePaper>
  );
};

export default BlockPage;
