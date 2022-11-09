import { FC } from 'react';

import { Token } from '@app/api';
import { useScrollToTop } from '@app/hooks';

import TokenDetailComponent from '../../../components/TokenDetailComponent';
import PagePaper from '../../../components/PagePaper';

interface SingleNFTPageComponentProps {
  token: Token;
  loading?: boolean;
}

const SingleNFTPage: FC<SingleNFTPageComponentProps> = ({ loading, token }) => {
  useScrollToTop();

  if (!token) return null;

  return (
    <PagePaper>
      <TokenDetailComponent loading={loading} token={token} />
    </PagePaper>
  );
};

export default SingleNFTPage;
