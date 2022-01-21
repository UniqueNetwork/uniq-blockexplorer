import React from 'react';
import { useQuery } from '@apollo/client';
import { Heading } from '@unique-nft/ui-kit';

import LoadingComponent from '../../../components/LoadingComponent';
import { BlockDetailData, BlockDetailVariables, blockDetail } from '../../../api/graphQL';

const BlockDetailComponent = (props: { blockNumber: string | undefined }) => {
  const { blockNumber } = props;
  const { data: blockDetails,
    loading: isBLockFetching } = useQuery<BlockDetailData, BlockDetailVariables>(blockDetail.getBlockQuery, {
    notifyOnNetworkStatusChange: true,
    variables: { block_number: blockNumber || '' }
  });

  if (isBLockFetching) return <LoadingComponent />;

  const { block_hash: blockHash,
    extrinsics_root: extrinsicsRoot,
    parent_hash: parentHash,
    spec_version: specVersion,
    state_root: stateRoot,
    timestamp,
    total_events: totalEvents } = blockDetails?.block[0] || {};

  return (
    <>
      <Heading>{`Block ${blockNumber || ''}`}</Heading>
      <div className={'grid-container container-with-border grid-container_extrinsic-container'}>
        <div className={'grid-item_col2 text_grey'}>Status</div>
        <div className={'grid-item_col10'}>Unavailable</div>
        <div className={'grid-item_col2 text_grey'}>Timestamp</div>
        <div className={'grid-item_col10'}>
          {timestamp && new Date(timestamp * 1000).toLocaleString()}
        </div>
      </div>

      <div className={'grid-container container-with-border grid-container_extrinsic-container'}>
        <div className={'grid-item_col2 text_grey'}>Total events</div>
        <div className={'grid-item_col10'}>{totalEvents}</div>
        <div className={'grid-item_col2 text_grey'}>Spec version</div>
        <div className={'grid-item_col10'}>{specVersion}</div>
      </div>

      <div className={'grid-container grid-container_extrinsic-container'}>
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
    </>
  );
};

export default BlockDetailComponent;
