import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';

import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { useApi, useScrollToTop } from '@app/hooks';
import { Tabs } from '@app/components';
import { normalizeSubstrate } from '@app/utils/normalizeAccount';
import { LastTransfers } from '@app/pages/Main/components';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { Question } from '@app/images/icons/svgs';
import EventsTable from '@app/components/EventsTable/EventsTable';

import BundlesComponent from './components/BundlesComponent';
import AccountDetailComponent from './components/AccountDetailComponent';
import CollectionsComponent from './components/CollectionsComponent';
import TokensComponent from './components/TokensComponent';
import PagePaper from '../../components/PagePaper';

const AccountPage = () => {
  useScrollToTop();
  const { accountId } = useParams();
  const { currentChain } = useApi();
  // assume that we got the substrate address
  let substrateAddress = accountId;
  let accountForTokensSearch = accountId;

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

  // if we get an ether address
  if (/0x[0-9A-Fa-f]{40}/g.test(accountId as string)) {
    substrateAddress = getMirrorFromEthersToSubstrate(
      accountId as string,
      currentChain.network,
    );
    accountForTokensSearch = accountId?.toLowerCase();
  }

  // user analytics
  useEffect(() => {
    if (activeAssetsTabIndex === 1) {
      logUserEvents(UserEvents.Click.ON_NFTS_TAB_FROM_ACCOUNT_PAGE);
    }
  }, [activeAssetsTabIndex]);

  if (!accountId) return null;

  return (
    <>
      <Wrapper className="account-page">
        <PagePaper>
          <AccountDetailComponent
            accountId={accountId}
            substrateAddress={substrateAddress as string}
          />
        </PagePaper>
        <PagePaper>
          <ScrollXWrapper>
            <Tabs
              content={[
                'tokens',
                'collections',
                <div className="flex-row">
                  Bundles
                  <img data-tip={true} alt="tooltip" data-for="sadFace" src={Question} />
                  <ReactTooltip id="sadFace" effect="solid">
                    <span>A tree with nested tokens</span>
                  </ReactTooltip>
                </div>,
              ]}
              currentTabIndex={activeAssetsTabIndex}
              setCurrentTabIndex={setActiveAssetsTabIndex}
            />
          </ScrollXWrapper>
          {activeAssetsTabIndex === 0 && (
            <TokensComponent accountId={accountForTokensSearch as string} key="tokens" />
          )}
          {activeAssetsTabIndex === 1 && (
            <CollectionsComponent
              accountId={normalizeSubstrate(substrateAddress as string)}
              key="collections"
            />
          )}
          {activeAssetsTabIndex === 2 && (
            <BundlesComponent
              accountId={normalizeSubstrate(substrateAddress as string)}
              key="collections"
            />
          )}
        </PagePaper>
        {activeAssetsTabIndex === 2 ? (
          <EventsTable
            header={'Bundle events'}
            accountId={normalizeSubstrate(substrateAddress as string)}
            tokens={[]}
          />
        ) : (
          <LastTransfers accountId={substrateAddress} pageSize={10} />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-row-gap: var(--gap);
`;

const ScrollXWrapper = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export default AccountPage;
