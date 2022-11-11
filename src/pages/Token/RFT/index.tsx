import { FC } from 'react';

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

  if (!token) return null;

  return (
    <>
      <PagePaper>
        <TokenDetailComponent loading={loading} token={token} />
      </PagePaper>
      <OwnersTable />
      <EventsTable />
    </>
  );
};

export default SingleRFTPage;
