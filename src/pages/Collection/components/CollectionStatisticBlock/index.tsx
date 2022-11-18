import React, { useState } from 'react';

import PagePaper from '@app/components/PagePaper';
import { Tabs } from '@app/components';
import HoldersComponent from '@app/pages/Collection/components/CollectionStatisticBlock/HoldersComponent';
import EventsTable from '@app/components/EventsTable/EventsTable';
import { getBundleEventsAccountsPageColumns } from '@app/pages/Account/components/BundlesComponent/columnsSchema';
import { useGraphQlTokens } from '@app/api';

interface CollectionStatisticBlockProps {
  collectionId?: string;
}

const tabs = ['Holders', 'Tokens event', 'Collection event'];

const CollectionStatisticBlock = ({ collectionId }: CollectionStatisticBlockProps) => {
  const [activeDetailTabIndex, setActiveDetailTabIndex] = useState<number>(0);
  const { tokens } = useGraphQlTokens({
    filter: collectionId
      ? { collection_id: { _eq: Number(collectionId) }, burned: { _eq: 'false' } }
      : { burned: { _eq: 'false' } },
    offset: 0,
    pageSize: 16,
  });

  const tokenKeys = tokens?.length
    ? tokens.map((token) => ({
        collectionId: token.collection_id,
        tokenId: token.token_id,
      }))
    : [];

  return (
    <PagePaper>
      <Tabs
        content={tabs}
        currentTabIndex={activeDetailTabIndex}
        setCurrentTabIndex={setActiveDetailTabIndex}
      />
      {activeDetailTabIndex === 0 && (
        <HoldersComponent collectionId={collectionId} key={'holder'} />
      )}
      {activeDetailTabIndex === 1 && (
        <EventsTable
          getEventsColumns={getBundleEventsAccountsPageColumns}
          tokens={tokenKeys}
        />
      )}
    </PagePaper>
  );
};

export default CollectionStatisticBlock;
