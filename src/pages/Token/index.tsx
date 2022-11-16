import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGraphQlToken } from '@app/api';
import { useScrollToTop } from '@app/hooks';

import { Bundle, SingleNFT, RFT } from '..';
import Page404 from '../404';

const TokenPage: FC = () => {
  useScrollToTop();
  const { collectionId, tokenId } = useParams<{
    collectionId: string;
    tokenId: string;
  }>();

  const { isTokensFetching, token } = useGraphQlToken(
    Number(collectionId),
    Number(tokenId),
  );

  if ((!token && !isTokensFetching) || token?.burned) return <Page404 />;

  if (!token) return null;

  return (
    <>
      {token.type === 'NESTED' && <Bundle loading={isTokensFetching} token={token} />}
      {token.type === 'NFT' && <SingleNFT loading={isTokensFetching} token={token} />}
      {token.type === 'FRACTIONAL' && <RFT loading={isTokensFetching} token={token} />}
    </>
  );
};

export default TokenPage;
