import React, { FC } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Heading, Text } from '@unique-nft/ui-kit';
import { extrinsic as gqlExtrinsic } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { shortcutText } from '../../../utils/textUtils';
import ChainLogo from '../../../components/ChainLogo';
import { useApi } from '../../../hooks/useApi';

const ExtrinsicDetail: FC<{ className?: string }> = ({ className }) => {
  const { blockIndex } = useParams();

  const { chainData } = useApi();

  const { extrinsic, isExtrinsicFetching } = gqlExtrinsic.useGraphQlExtrinsic(blockIndex);

  const deviceSize = useDeviceSize();

  if (!blockIndex) return null;

  if (isExtrinsicFetching) return <LoadingComponent />;

  const { amount,
    block_number: blockNumber,
    fee,
    from_owner: fromOwner,
    hash,
    timestamp,
    to_owner: toOwner } = extrinsic || {};

  return (
    <div className={className}>
      <Heading>{`Extrinsic ${blockIndex}`}</Heading>
      <div className={'extrinsic-container'}>
        <Text
          className={'grid-item_col1'}
          color={'grey-500'}
        >
          Block
        </Text>
        <Text className={'grid-item_col11'}>{blockNumber?.toString() || ''}</Text>
        <Text
          className={'grid-item_col1'}
          color={'grey-500'}
        >
          Timestamp
        </Text>
        <Text className={'grid-item_col11'}>
          {timestamp ? new Date(timestamp * 1000).toLocaleString() : ''}
        </Text>
      </div>
      <div className={'extrinsic-container'}>
        <Text
          className={'grid-item_col1'}
          color={'grey-500'}
        >
          Sender
        </Text>
        <div className={'grid-item_col11'}>
          {fromOwner && (
            <AccountLinkComponent
              noShort={deviceSize !== DeviceSize.sm}
              size={'m'}
              value={fromOwner}
            />
          )}
        </div>
        <Text
          className={'grid-item_col1'}
          color={'grey-500'}
        >
          Destination
        </Text>
        <div className={'grid-item_col11'}>
          {toOwner && (
            <AccountLinkComponent
              noShort={deviceSize !== DeviceSize.sm}
              size={'m'}
              value={toOwner}
            />
          )}
        </div>
      </div>
      <div className={'extrinsic-container'}>
        <Text
          className={'grid-item_col1 '}
          color={'grey-500'}
        >
          Amount
        </Text>
        {/* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */}
        <div className={'grid-item_col11'}>
          <ChainLogo isInline={true} />
          {Number(amount) || 0} {chainData?.properties.tokenSymbol}
        </div>
        <Text
          className={'grid-item_col1'}
          color={'grey-500'}
        >
          Fee
        </Text>
        <div className={'grid-item_col11'}>
          <ChainLogo isInline={true} />
          {Number(fee) || 0} {chainData?.properties.tokenSymbol}
        </div>
      </div>
      <div className={'extrinsic-container'}>
        {hash && <><Text
          className={'grid-item_col1'}
          color={'grey-500'}
        >
          Hash
        </Text>
        <Text className={'grid-item_col11'}>
          {deviceSize !== DeviceSize.sm ? hash : shortcutText(hash)}
        </Text></>}
        <Text
          className={'grid-item_col1'}
          color={'grey-500'}
        >
          Extrinsic
        </Text>
        <Text className={'grid-item_col11'}>{blockIndex}</Text>
      </div>
    </div>
  );
};

export default styled(ExtrinsicDetail)`
  .extrinsic-container {
    display: grid;
    grid-column-gap: var(--gap);
    border-bottom: 1px dashed #D2D3D6;
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
    border-bottom: 1px dashed #D2D3D6;
  }

  @media (max-width: 767px) {
    .extrinsic-container {
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
