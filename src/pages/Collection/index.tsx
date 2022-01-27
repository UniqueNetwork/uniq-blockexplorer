import { Heading, Tabs } from '@unique-nft/ui-kit';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import BasicDataComponent from './components/BasicDataComponent';
import ExtendedDataComponent from './components/ExtendedDataComponent';
import { collections as gqlCollections } from '../../api/graphQL/';
import { useParams } from 'react-router-dom';
import HoldersComponent from './components/HoldersComponent';
import CollectionEventsComponent from './components/CollectionEventsComponent';
import TokensEventsComponent from './components/TokensEventsComponent';

interface CollectionProps {
  className?: string
}

const detailTabs = ['Basic data', 'Extended'];
const eventsTabs = ['Holders', 'Token events', 'Collection events'];

const CollectionPage: FC<CollectionProps> = ({ className }) => {
  const [activeDetailTabIndex, setActiveDetailTabIndex] = useState<number>(0);
  const [activeEventsTabIndex, setActiveEventsTabIndex] = useState<number>(0);

  const { collectionId } = useParams<{ collectionId: string }>();

  const { collection } = gqlCollections.useGraphQlCollection(collectionId || '');

  return (
    <div className={className}>
      <div className={'collection-title'}>
        <Avatar size={'large'} />
        <Heading size={'2'}>{collection?.name || ''}</Heading>
      </div>
      <Tabs
        activeIndex={activeDetailTabIndex}
        labels={detailTabs}
        onClick={setActiveDetailTabIndex}
      />
      <Tabs
        activeIndex={activeDetailTabIndex}
        contents={[
          <BasicDataComponent
            collection={collection}
            key={'collections'}
          />,
          <ExtendedDataComponent
            collection={collection}
            key={'tokens'}
          />
        ]}
      />
      <Tabs
        activeIndex={activeEventsTabIndex}
        labels={eventsTabs}
        onClick={setActiveEventsTabIndex}
      />
      <Tabs
        activeIndex={activeEventsTabIndex}
        contents={[
          <HoldersComponent
            key={'holder'}
            tokens={collection?.tokens || []}
          />,
          <TokensEventsComponent
            key={'tokens-events'}
          />,
          <CollectionEventsComponent
            key={'collection-events'}
          />
        ]}
      />

    </div>
  );
};

export default styled(CollectionPage)`
  .collection-title {
    display: flex;
    align-items: center;
    column-gap: var(--gap);
    margin-bottom: calc(var(--gap) * 2);
    h2 {
      margin-bottom: 0 !important;
    }
    
  }
`;
