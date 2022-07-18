import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Heading, Tabs } from '@unique-nft/ui-kit';
import amplitude from 'amplitude-js';
import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { useApi } from '@app/hooks';
import { normalizeSubstrate } from '@app/utils/normalizeAccount';

import AccountDetailComponent from './components/AccountDetailComponent';
import LastTransfersComponent from '../Main/components/LastTransfersComponent';
import CollectionsComponent from './components/CollectionsComponent';
import TokensComponent from './components/TokensComponent';
import PagePaper from '../../components/PagePaper';
import { UserEvents } from '@app/analytics/user_analytics';

const assetsTabs = ['Collections', 'NFTs'];

const AccountPage = () => {
  const { accountId } = useParams();
  // assume that we got the substrate address
  let substrateAddress = accountId;
  let accountForTokensSearch = accountId;

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);
  const { currentChain } = useApi();

  // if we get an ether address
  if ((/0x[0-9A-Fa-f]{40}/g).test(accountId as string)) {
    const substrateMirror = getMirrorFromEthersToSubstrate(accountId as string, currentChain.network);

    substrateAddress = substrateMirror;
    accountForTokensSearch = accountId?.toLowerCase();
  }

  // user analytics
  useEffect(() => {
    if (activeAssetsTabIndex === 1) {
      amplitude.getInstance().logEvent(UserEvents.Click.ON_NFTS_TAB_FROM_ACCOUNT_PAGE);
    }
  }, [activeAssetsTabIndex]);

  if (!accountId) return null;

  return (
    <PagePaper>
      <AccountDetailComponent accountId={substrateAddress as string} />
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
            accountId={normalizeSubstrate(substrateAddress as string)}
            key={'collections'}
          />
          <TokensComponent
            accountId={accountForTokensSearch as string}
            key={'tokens'}
          />
        </Tabs>
      </AssetsWrapper>
      <LastTransfersComponent
        accountId={substrateAddress}
        pageSize={10}
      />
    </PagePaper>
  );
};

const AssetsWrapper = styled.div`
  padding-top: calc(var(--gap) * 1.5);
`;

export default AccountPage;
