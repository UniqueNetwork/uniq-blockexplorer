import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Heading, Tabs } from '@unique-nft/ui-kit';

import AccountDetailComponent from './components/AccountDetailComponent';
import LastTransfersComponent from '../Main/components/LastTransfersComponent';
import CollectionsComponent from './components/CollectionsComponent';
import TokensComponent from './components/TokensComponent';
import PagePaper from '../../components/PagePaper';
import amplitude from 'amplitude-js';

const assetsTabs = ['Collections', 'NFTs'];

const AccountPage = () => {
  const { accountId } = useParams();

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

  // user analytics
  useEffect(() => {
    if (activeAssetsTabIndex === 1) {
      amplitude.getInstance().logEvent('CLICK_ON_NFTS_TAB_FROM_ACCOUNT_PAGE');
    }
  }, [activeAssetsTabIndex]);

  if (!accountId) return null;

  return (
    <PagePaper>
      <AccountDetailComponent accountId={accountId} />
      <AssetsWrapper>
        <Heading size={'2'}>Assets</Heading>
        <Tabs
          activeIndex={activeAssetsTabIndex}
          labels={assetsTabs}
          onClick={setActiveAssetsTabIndex}
        />
        <Tabs
          activeIndex={activeAssetsTabIndex}
        >
          <CollectionsComponent
            accountId={accountId}
            key={'collections'}
          />
          <TokensComponent
            accountId={accountId}
            key={'tokens'}
          />
        </Tabs>
      </AssetsWrapper>
      <LastTransfersComponent
        accountId={accountId}
        pageSize={10}
      />
    </PagePaper>
  );
};

const AssetsWrapper = styled.div`
  padding-top: calc(var(--gap) * 1.5);
`;

export default AccountPage;
