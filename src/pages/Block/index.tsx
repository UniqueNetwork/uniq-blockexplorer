import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Tabs } from '@unique-nft/ui-kit';

import BlockDetailComponent from './components/BlockDetailComponent';
import ExtrinsicsListComponent from './components/ExtrinsicsListComponent';
import EventListComponent from './components/EventsListComponent';

const assetsTabs = ['Extrinsics', 'Events'];

const BlockPage: FC<{ className?: string }> = ({
  className
}) => {
  const {
    blockIndex
  } = useParams();

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);

  return (<div className={className}>
    <div className={'block'}>
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
    </div>
  </div>);
};

export default styled(BlockPage)`
  .block {
    &__table {
      &-title {
        display: none;
      }
    }
  }

  @media (max-width: 767px) {
    .block {
      .unique-tabs-items {
        display: flex;
        flex-direction: column;

        .tab-item {
          display: flex;
          min-width: 100%;
          max-width: 100%;
          border-radius: 0;

          border: 1px solid #009cf0;

          &:first-child {
            border-radius: 4px 4px 0 0;
          }

          &:last-child {
            border-radius: 0 0 4px 4px;
          }
        }
      }

      table {
        display: block;
      }

      .rc-table {
        display: block;
      }

      .rc-table-thead {
        display: none;
      }

      .rc-table-tbody {
        display: block;
      }

      .rc-table-row {
        display: flex;
        flex-direction: column;
        //min-width: 100vw;
        .rc-table-cell {
          border: none;
          padding: 8px 0;

          &:last-child {
            border-bottom: 1px dashed #d2d3d6;
            padding-bottom: 16px;
          }

          &:first-child {
            padding-top: 16px;
          }
        }
      }

      &__table {
        display: flex;
        flex-direction: column;

        &-title {
          display: block;
          margin-bottom: 4px;
        }
      }

      &__text-wrap {
        max-width: 100%;
        //white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }

      .grid-container {
        border: none;
        margin-bottom: 0;
        padding-bottom: 0 !important;
        padding-top: 0 !important;

        .grid-item_col2,
        .grid-item_col10 {
          grid-column: span 12;
        }

        .grid-item_col2 {
          margin-bottom: 4px;
        }

        .grid-item_col10 {
          margin-bottom: 16px;
        }
      }
    }
  }

`;
