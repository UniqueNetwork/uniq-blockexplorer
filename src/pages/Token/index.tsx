import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { TokenTypeEnum, useGraphQlToken } from '@app/api';
import { useScrollToTop } from '@app/hooks';

import { Bundle, RFT, SingleNFT } from '..';
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

  if (token?.nested) return <Bundle loading={isTokensFetching} token={token} />;

  if (token?.type === TokenTypeEnum.NFT)
    return <SingleNFT loading={isTokensFetching} token={token} />;

  if (token?.type === TokenTypeEnum.RFT)
    return <RFT loading={isTokensFetching} token={token} />;

  return null;
};

export default TokenPage;
