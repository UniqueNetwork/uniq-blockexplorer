import React, { FC } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Heading } from '@unique-nft/ui-kit';

import LoadingComponent from '../../../components/LoadingComponent';
import { BlockDetailData, BlockDetailVariables, blockDetail } from '../../../api/graphQL';

const BlockDetailComponent: FC<{ className?: string, blockNumber: string | undefined }> = ({ blockNumber, className }) => {
  const {
    data: blockDetails,
    loading: isBLockFetching
  } = useQuery<BlockDetailData, BlockDetailVariables>(blockDetail.getBlockQuery, {
    notifyOnNetworkStatusChange: true,
    variables: { block_number: blockNumber || '' }
  });

  if (isBLockFetching) return <LoadingComponent />;

  const {
    block_hash: blockHash,
    extrinsics_root: extrinsicsRoot,
    parent_hash: parentHash,
    spec_version: specVersion,
    state_root: stateRoot,
    timestamp,
    total_events: totalEvents
  } = blockDetails?.block[0] || {};

  return (
    <div className={className}>
      <Heading>{`Block ${blockNumber || ''}`}</Heading>
      <div className={'extrinsic-container'}>
        <div className={'grid-item_col2 text_grey'}>Status</div>
        <div className={'grid-item_col10'}>Unavailable</div>
        <div className={'grid-item_col2 text_grey'}>Timestamp</div>
        <div className={'grid-item_col10'}>
          {timestamp && new Date(timestamp * 1000).toLocaleString()}
        </div>
      </div>

      <div className={'extrinsic-container'}>
        <div className={'grid-item_col2 text_grey'}>Total events</div>
        <div className={'grid-item_col10'}>{totalEvents}</div>
        <div className={'grid-item_col2 text_grey'}>Spec version</div>
        <div className={'grid-item_col10'}>{specVersion}</div>
      </div>

      <div className={'extrinsic-container'}>
        <div className={'grid-item_col2 text_grey'}>Block hash</div>
        <div className={'grid-item_col10'}>
          <div
            className={'block__text-wrap'}
            title={blockHash}
          >
            {blockHash}
          </div>
        </div>

        <div className={'grid-item_col2 text_grey'}>Parent hash</div>
        <div className={'grid-item_col10'}>
          <div
            className={'block__text-wrap'}
            title={parentHash}
          >
            {parentHash}
          </div>
        </div>

        <div className={'grid-item_col2 text_grey'}>Extrinsic root</div>
        <div className={'grid-item_col10'}>
          <div
            className={'block__text-wrap'}
            title={extrinsicsRoot}
          >
            {extrinsicsRoot}
          </div>
        </div>

        <div className={'grid-item_col2 text_grey'}>State root</div>
        <div className={'grid-item_col10'}>
          <div
            className={'block__text-wrap'}
            title={stateRoot}
          >
            {stateRoot}
          </div>
        </div>
      </div>
    </div>
  );
};

export default styled(BlockDetailComponent)`
  .block-container {
    display: grid;
    grid-column-gap: var(--gap);
    border-bottom: 1px dashed var(--border-color);
    grid-template-columns: 85px 1fr;
    font-size: 16px;
    line-height: 20px;
    padding: calc(var(--gap) * 1.5) 0 !important;
    grid-row-gap: var(--gap);
    &:nth-child(2) {
      padding-top: 0 !important;
    }
  }

  .container-with-border {
    padding-bottom: calc(var(--gap) * 2);
    border-bottom: 1px dashed var(--border-color);
  }

  @media (max-width: 767px) {
    .block-container {
      grid-row-gap: 0;
      .grid-item_col1 {
        grid-column: span 11;
      }
      .grid-item_col1:not(:first-child) {
        margin-top: var(--gap);
      }
      .grid-item_col11 {
        margin-top: calc(var(--gap) / 4);
      }
    }
  }
`;
