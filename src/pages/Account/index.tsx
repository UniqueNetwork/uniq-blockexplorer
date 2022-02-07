import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Heading, Tabs } from '@unique-nft/ui-kit';

import AccountDetailComponent from './components/AccountDetailComponent';
import LastTransfersComponent from '../Main/components/LastTransfersComponent';
import CollectionsComponent from './components/CollectionsComponent';
import TokensComponent from './components/TokensComponent';
import { useApi } from '../../hooks/useApi';
import PagePaper from '../../components/PagePaper';

const assetsTabs = ['Collections', 'NFTs'];

const AccountPage = () => {
  const { accountId } = useParams();
  const { chainData } = useApi();

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

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
      <Heading size={'2'}>{`Last ${chainData?.properties.tokenSymbol || ''} transfers`}</Heading>
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
