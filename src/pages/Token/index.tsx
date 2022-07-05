import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { tokens } from '../../api/graphQL/';
import TokenDetailComponent from './components/TokenDetailComponent';
import PagePaper from '../../components/PagePaper';

const TokenPage: FC = () => {
  const { collectionId, tokenId } = useParams<{ collectionId: string, tokenId: string }>();

  const { isTokensFetching, token } = tokens.useGraphQlToken(Number(collectionId), Number(tokenId));

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
