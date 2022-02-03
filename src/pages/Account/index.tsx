import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Tabs } from '@unique-nft/ui-kit';

import AccountDetailComponent from './components/AccountDetailComponent';
import LastTransfersComponent from '../Main/components/LastTransfersComponent';
import CollectionsComponent from './components/CollectionsComponent';
import TokensComponent from './components/TokensComponent';
import { useApi } from '../../hooks/useApi';

const assetsTabs = ['Collections', 'NFTs'];

const AccountPage = () => {
  const { accountId } = useParams();
  const { chainData } = useApi();

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

  if (!accountId) return null;

  return (
    <>
      <AccountDetailComponent accountId={accountId} />
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
      <Heading size={'2'}>{`Last ${chainData?.properties.tokenSymbol || ''} transfers`}</Heading>
      <LastTransfersComponent
        accountId={accountId}
        pageSize={10}
      />
    </>
  );
};

export default AccountPage;
