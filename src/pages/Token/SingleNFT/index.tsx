import React, { FC } from 'react';

import { Token } from '@app/api';
import { useScrollToTop } from '@app/hooks';
import EventsTable from '@app/components/EventsTable/EventsTable';

import TokenDetailComponent from '../../../components/TokenDetailComponent';
import PagePaper from '../../../components/PagePaper';

interface SingleNFTPageComponentProps {
  token: Token;
  loading?: boolean;
}

const SingleNFTPage: FC<SingleNFTPageComponentProps> = ({ loading, token }) => {
  useScrollToTop();

  if (!token) return null;

  const tokenKeys = [
    {
      collectionId: token.collection_id,
      tokenId: token.token_id,
    },
  ];

  return (
    <>
      <PagePaper>
        <TokenDetailComponent loading={loading} token={token} />
      </PagePaper>
      <EventsTable header="Events" tokens={tokenKeys} />
    </>
  );
};

export default SingleNFTPage;
