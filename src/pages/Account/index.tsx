import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Tabs } from '@unique-nft/ui-kit';
import AccountDetailComponent from './components/AccountDetailComponent';
import LastTransfersComponent from '../Main/components/LastTransfersComponent';
import { transfers as gqlTransfers } from '../../api/graphQL';
import CollectionsComponent from './components/CollectionsComponent';
import TokensComponent from './components/TokensComponent';
import { useApi } from '../../hooks/useApi';

const assetsTabs = ['Collections', 'Tokens'];

const AccountPage = () => {
  const { accountId } = useParams();
  const { chainData } = useApi();

  const pageSize = 10; // default

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

  const { fetchMoreTransfers, isTransfersFetching, transfers, transfersCount } =
    gqlTransfers.useGraphQlLastTransfers({ accountId, pageSize });

  const onTransfersPageChange = useCallback(
    (limit: number, offset: number) => {
      return fetchMoreTransfers({
        limit,
        offset
      });
    },
    [fetchMoreTransfers]
  );

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
        contents={[
          <CollectionsComponent
            accountId={accountId}
            key={'collections'}
          />,
          <TokensComponent
            accountId={accountId}
            key={'tokens'}
          />
        ]}
      />
      <Heading size={'2'}>{`Last ${chainData?.properties.tokenSymbol || ''} transfers`}</Heading>
      <LastTransfersComponent
        count={transfersCount}
        data={transfers || []}
        loading={isTransfersFetching}
        onPageChange={onTransfersPageChange}
        pageSize={pageSize}
      />
    </>
  );
};

export default AccountPage;
