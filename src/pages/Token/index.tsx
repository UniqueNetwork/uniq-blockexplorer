import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Heading } from '@unique-nft/ui-kit';

import { tokens } from '../../api/graphQL/';
import TokenDetailComponent from './components/TokenDetailComponent';
import TokenEventsComponent from '../Collection/components/TokenEventsComponent';

const TokenPage: FC = () => {
  const { collectionId, tokenId } = useParams<{ collectionId: string, tokenId: string }>();

  const { isTokensFetching, token } = tokens.useGraphQlToken(collectionId || '', tokenId || '');

  return (
    <>
      <TokenDetailComponent
        loading={isTokensFetching}
        token={token}
      />
      <Heading size={'2'}>Events</Heading>
      <TokenEventsComponent tokenId={token?.token_id} />
    </>
  );
};

export default TokenPage;
