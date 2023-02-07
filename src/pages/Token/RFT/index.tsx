import { FC, useMemo } from 'react';

import { Token } from '@app/api';
import { useScrollToTop } from '@app/hooks';

import TokenDetailComponent from '../../../components/TokenDetailComponent';
import PagePaper from '../../../components/PagePaper';
import EventsTable from './components/Events/EventsTable';
import OwnersTable from './components/OwnersSection/OwnersTable';

interface SingleNFTPageComponentProps {
  token: Token;
  loading?: boolean;
}

const SingleRFTPage: FC<SingleNFTPageComponentProps> = ({ loading, token }) => {
  useScrollToTop();

  const tokens = useMemo(() => {
    if (!token) return [];

    return [
      {
        collectionId: token.collection_id,
        tokenId: token.token_id,
      },
    ];
  }, [token]);

  if (!token) return null;

  return (
    <>
      <PagePaper>
        <TokenDetailComponent loading={loading} token={token} />
      </PagePaper>
      <OwnersTable totalPieces={token.total_pieces || 1} />
      <EventsTable tokens={tokens} />
    </>
  );
};

export default SingleRFTPage;
