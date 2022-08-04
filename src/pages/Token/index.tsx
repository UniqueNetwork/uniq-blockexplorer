import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGraphQlToken } from '@app/api';

import TokenDetailComponent from './components/TokenDetailComponent';
import PagePaper from '../../components/PagePaper';

const TokenPage: FC = () => {
  const { collectionId, tokenId } = useParams<{ collectionId: string, tokenId: string }>();

  const { isTokensFetching, token } = useGraphQlToken(Number(collectionId), Number(tokenId));

  return (
    <PagePaper>
      <TokenDetailComponent
        loading={isTokensFetching}
        token={token}
      />
    </PagePaper>
  );
};

export default TokenPage;
