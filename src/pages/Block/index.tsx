import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from '@unique-nft/ui-kit';

import BlockDetailComponent from './components/BlockDetailComponent';
import ExtrinsicsListComponent from './components/ExtrinsicsListComponent';
import EventListComponent from './components/EventsListComponent';

const assetsTabs = ['Extrinsics', 'Events'];

const BlockPage: FC = () => {
  const { blockIndex } = useParams();

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

  return (
    <>
      <BlockDetailComponent blockNumber={blockIndex} />

      <Tabs
        activeIndex={activeAssetsTabIndex}
        labels={assetsTabs}
        onClick={setActiveAssetsTabIndex}
      />
      <Tabs
        activeIndex={activeAssetsTabIndex}
        contents={[
          <ExtrinsicsListComponent
            blockNumber={blockIndex}
            key={'extrinsic-list'}
          />,
          <EventListComponent
            blockNumber={blockIndex}
            key={'event-list'}
          />
        ]}
      />
    </>
  );
};

export default BlockPage;
