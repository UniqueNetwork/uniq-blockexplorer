import React, { FC } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Heading, Text } from '@unique-nft/ui-kit';

import LoadingComponent from '../../../components/LoadingComponent';
import { BlockDetailData, BlockDetailVariables, blockDetail } from '../../../api/graphQL';

const BlockDetailComponent: FC<{ className?: string, blockNumber: string | undefined }> = ({ blockNumber }) => {
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
    <BlockDetailWrapper>
      <Heading>{`Block ${blockNumber || ''}`}</Heading>
      <div className='block-container'>
        <Text color='grey-500'>Timestamp</Text>
        <div className='grid-item_col10'>
          {timestamp && new Date(timestamp * 1000).toLocaleString()}
        </div>
      </div>

      <div className='block-container'>
        <Text color='grey-500'>Total events</Text>
        <div className='grid-item_col10'>{totalEvents}</div>
        <Text color='grey-500'>Spec version</Text>
        <div className='grid-item_col10'>{specVersion}</div>
      </div>

      <div className='block-container'>
        <Text color='grey-500'>Block hash</Text>
        <div className='grid-item_col10'>
          <div
            className='block__text-wrap'
            title={blockHash}
          >
            {blockHash}
          </div>
        </div>

        <Text color='grey-500'>Parent hash</Text>
        <div className='grid-item_col10'>
          <div
            className='block__text-wrap'
            title={parentHash}
          >
            {parentHash}
          </div>
        </div>

        <Text color='grey-500'>Extrinsic root</Text>
        <div className='grid-item_col10'>
          <div
            className='block__text-wrap'
            title={extrinsicsRoot}
          >
            {extrinsicsRoot}
          </div>
        </div>

        <Text color='grey-500'>State root</Text>
        <div className='grid-item_col10'>
          <div
            className='block__text-wrap'
            title={stateRoot}
          >
            {stateRoot}
          </div>
        </div>
      </div>
    </BlockDetailWrapper>
  );
};

const BlockDetailWrapper = styled.div`
  margin-bottom: calc(var(--gap) * 2);
  .block-container {
    display: grid;
    grid-column-gap: var(--gap);
    border-bottom: 1px dashed #D2D3D6;
    grid-template-columns: 120px 1fr;
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
    border-bottom: 1px dashed #D2D3D6;
  }

  @media (max-width: 767px) {
    .block-container {
      grid-row-gap: 0;
      div {
        grid-column: span 2;
      }
      div:not(:first-child) {
        margin-top: var(--gap);
      }
      .grid-item_col11 {
        margin-top: calc(var(--gap) / 4);
      }
    }
  }
`;

export default BlockDetailComponent;
