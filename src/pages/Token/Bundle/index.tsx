import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGraphQLBundleTree } from '@app/api/graphQL/bundleTree/bundleTree';
import { TokenKeys } from '@app/api/graphQL/tokensEvents/types';
import { INestingToken } from '@app/pages/Token/Bundle/components/BundleTreeSection/BundleTree/types';
import { Token } from '@app/api';
import { useScrollToTop } from '@app/hooks';
import EventsTable from '@app/components/EventsTable/EventsTable';

import TokenDetailComponent from '../../../components/TokenDetailComponent';
import PagePaper from '../../../components/PagePaper';
import BundleTreeSection from './components/BundleTreeSection';
import Page404 from '../../404';

interface BundlePageComponentProps {
  token: Token;
  loading?: boolean;
}

const BundlePage: FC<BundlePageComponentProps> = ({ loading, token }) => {
  useScrollToTop();

  const { collectionId, tokenId } = useParams<{
    collectionId: string;
    tokenId: string;
  }>();

  const { bundle } = useGraphQLBundleTree(Number(collectionId), Number(tokenId));

  const tokensInBundle = useMemo(() => {
    const result: TokenKeys[] = [];
    const iter = (bundlesChildren: INestingToken) => {
      result.push({
        tokenId: bundlesChildren.token_id,
        collectionId: bundlesChildren.collection_id,
      });
      bundlesChildren.nestingChildren?.map((child) => iter(child));
    };

    if (bundle) iter(bundle);

    return result;
  }, [bundle]);

  if ((!token && !loading) || token?.burned) return <Page404 />;

  if (!token) return null;

  return (
    <>
      <PagePaper>
        <TokenDetailComponent loading={loading} token={token} />
      </PagePaper>
      <BundleTreeSection token={token} />
      <EventsTable header={'Bundle events'} tokens={tokensInBundle} />
    </>
  );
};

export default BundlePage;
