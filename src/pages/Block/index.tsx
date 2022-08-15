import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import BlockDetailComponent from './components/BlockDetailComponent';
import PagePaper from '../../components/PagePaper';

const BlockPage: FC = () => {
  const { blockIndex } = useParams();

  return (
    <PagePaper>
      <BlockDetailComponent blockNumber={blockIndex} />
    </PagePaper>
  );
};

export default BlockPage;
