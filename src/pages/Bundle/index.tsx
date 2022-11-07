import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGraphQlToken } from '@app/api';
import { useScrollToTop } from '@app/hooks';
import EventsTable from '@app/pages/Bundle/components/Events/EventsTable';

import TokenDetailComponent from '../../components/TokenDetailComponent';
import PagePaper from '../../components/PagePaper';
import BundleTreeSection from './components/BundleTreeSection';

const BundlePage: FC = () => {
  useScrollToTop();
  const { collectionId, tokenId } = useParams<{
    collectionId: string;
    tokenId: string;
  }>();

  const { isTokensFetching, token } = useGraphQlToken(
    Number(collectionId),
    Number(tokenId),
  );

  if (!token) return null;

  return (
    <>
      <PagePaper>
        <TokenDetailComponent loading={isTokensFetching} token={token} />
      </PagePaper>
      <BundleTreeSection token={token} />
      <EventsTable />
    </>
  );
};

export default BundlePage;
