import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { tokens } from '../../api/graphQL/';
import TokenDetailComponent from './components/TokenDetailComponent';
import PagePaper from '../../components/PagePaper';
// import TokenEventsComponent from '../Collection/components/TokenEventsComponent';

const TokenPage: FC = () => {
  const { collectionId, tokenId } = useParams<{ collectionId: string, tokenId: string }>();

  const { isTokensFetching, token } = tokens.useGraphQlToken(collectionId || '', tokenId || '');

  return (
    <PagePaper>
      <TokenDetailComponent
        loading={isTokensFetching}
        token={token}
      />
      {/* <Heading size={'2'}>Events</Heading> */}
      {/* <TokenEventsComponent tokenId={token?.token_id} /> */}
    </PagePaper>
  );
};

export default TokenPage;
