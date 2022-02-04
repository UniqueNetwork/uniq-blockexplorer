import { Heading, Tabs } from '@unique-nft/ui-kit';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import CollectionBasicDataComponent from './components/CollectionBasicDataComponent';
import CollectionExtendedDataComponent from './components/CollectionExtendedDataComponent';
import { collections as gqlCollections, tokens as gqlTokens } from '../../api/graphQL/';
import { useParams } from 'react-router-dom';
import HoldersComponent from './components/HoldersComponent';
import CollectionEventsComponent from './components/CollectionEventsComponent';
import TokenEventsComponent from './components/TokenEventsComponent';
import config from '../../config';

const { IPFSGateway } = config;

const detailTabs = ['Basic data', 'Extended'];
const eventsTabs = ['Holders'/*, 'Collection events' */];

const CollectionPage: FC = () => {
  const [activeDetailTabIndex, setActiveDetailTabIndex] = useState<number>(0);
  const [activeEventsTabIndex, setActiveEventsTabIndex] = useState<number>(0);

  const { collectionId } = useParams<{ collectionId: string }>();

  const { collection } = gqlCollections.useGraphQlCollection(collectionId || '');

  const { tokens } = gqlTokens.useGraphQlTokens({ filter: { collection_id: { _eq: collectionId } }, pageSize: 8 });

  return (
    <div>
      <CollectionTitle>
        <Avatar
          size={'large'}
          src={collection?.collection_cover ? `${IPFSGateway || ''}/${collection?.collection_cover}` : undefined}
        />
        <Heading size={'2'}>{collection?.name || ''}</Heading>
      </CollectionTitle>
      <Tabs
        activeIndex={activeDetailTabIndex}
        labels={detailTabs}
        onClick={setActiveDetailTabIndex}
      />
      <Tabs
        activeIndex={activeDetailTabIndex}
      >
        <CollectionBasicDataComponent
          collection={collection}
          key={'collections'}
        />
        <CollectionExtendedDataComponent
          collection={collection}
          key={'tokens'}
        />
      </Tabs>
      <Tabs
        activeIndex={activeEventsTabIndex}
        labels={eventsTabs}
        onClick={setActiveEventsTabIndex}
      />
      <Tabs
        activeIndex={activeEventsTabIndex}
      >
        <HoldersComponent
          key={'holder'}
          tokens={tokens || []}
        />
        <></>
        {/* <TokenEventsComponent */}
        {/*  key={'tokens-events'} */}
        {/* /> */}
        {/* <CollectionEventsComponent */}
        {/*  key={'collection-events'} */}
        {/* /> */}
      </Tabs>
    </div>
  );
};

const CollectionTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) * 2);
  h2 {
    margin-bottom: 0 !important;
  }
`;

export default CollectionPage;
