import React, { useState } from 'react';
import styled from 'styled-components/macro';

import PagePaper from '@app/components/PagePaper';
import { Tabs } from '@app/components';
import HoldersComponent from '@app/pages/Collection/components/CollectionStatisticBlock/HoldersComponent';
import EventsTable from '@app/components/EventsTable/EventsTable';
import { useGraphQlTokens } from '@app/api';
import { getBundleEventsAccountsPageColumns } from '@app/pages/Account/components/BundlesComponent/Events/columnsSchema';

import { default as CollectionEventsTable } from './collectionEvents';

interface CollectionStatisticBlockProps {
  collectionId?: string;
}

const tabs = ['Holders', 'Token events', 'Collection events'];

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
      <ScrollXWrapper>
        <Tabs
          content={tabs}
          currentTabIndex={activeDetailTabIndex}
          setCurrentTabIndex={setActiveDetailTabIndex}
        />
      </ScrollXWrapper>
      {activeDetailTabIndex === 0 && (
        <HoldersComponent collectionId={collectionId} key={'holder'} />
      )}
      {activeDetailTabIndex === 1 && (
        <EventsTable
          getEventsColumns={getBundleEventsAccountsPageColumns}
          tokens={tokenKeys}
        />
      )}
      {activeDetailTabIndex === 2 && (
        <CollectionEventsTable collectionId={Number(collectionId)} />
      )}
    </PagePaper>
  );
};

const ScrollXWrapper = styled.div`
  padding-top: calc(var(--gap) * 1.5);
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export default CollectionStatisticBlock;
