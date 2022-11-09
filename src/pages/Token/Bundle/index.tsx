import { FC } from 'react';

import { Token } from '@app/api';
import { useScrollToTop } from '@app/hooks';
import EventsTable from '@app/pages/Token/Bundle/components/Events/EventsTable';

import TokenDetailComponent from '../../../components/TokenDetailComponent';
import PagePaper from '../../../components/PagePaper';
import BundleTreeSection from './components/BundleTreeSection';

interface BundlePageComponentProps {
  token: Token;
  loading?: boolean;
}

const BundlePage: FC<BundlePageComponentProps> = ({ loading, token }) => {
  useScrollToTop();

  if (!token) return null;

  return (
    <>
      <PagePaper>
        <TokenDetailComponent loading={loading} token={token} />
      </PagePaper>
      <BundleTreeSection token={token} />
      <EventsTable />
    </>
  );
};

export default BundlePage;
