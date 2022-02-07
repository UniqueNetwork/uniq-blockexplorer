import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from '@unique-nft/ui-kit';

import BlockDetailComponent from './components/BlockDetailComponent';
import ExtrinsicsListComponent from './components/ExtrinsicsListComponent';
import EventListComponent from './components/EventsListComponent';
import PagePaper from '../../components/PagePaper';

const assetsTabs = ['Extrinsics'/* , 'Events' */];

const BlockPage: FC = () => {
  const { blockIndex } = useParams();

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

  return (<PagePaper>
    <BlockDetailComponent blockNumber={blockIndex} />

    <ExtrinsicsListComponent
      blockNumber={blockIndex}
      key={'extrinsic-list'}
    />
    <Tabs
      activeIndex={activeAssetsTabIndex}
      labels={assetsTabs}
      onClick={setActiveAssetsTabIndex}
    />
    <Tabs
      activeIndex={activeAssetsTabIndex}
    >
      <ExtrinsicsListComponent
        blockNumber={blockIndex}
        key={'extrinsic-list'}
      />
      <></>
      {/* <EventListComponent */}
      {/*  blockNumber={blockIndex} */}
      {/*  key={'event-list'} */}
      {/* /> */}
    </Tabs>
  </PagePaper>);
};

export default BlockPage;
