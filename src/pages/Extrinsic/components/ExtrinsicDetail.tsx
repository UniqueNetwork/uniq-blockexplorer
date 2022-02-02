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

const ExtrinsicDetail: FC = () => {
  const { blockIndex } = useParams();

  const { chainData } = useApi();

  const { extrinsic, isExtrinsicFetching } = gqlExtrinsic.useGraphQlExtrinsic(blockIndex);

  const deviceSize = useDeviceSize();

  if (!blockIndex) return null;

  if (isExtrinsicFetching) return <LoadingComponent />;

  const {
    amount,
    block_number: blockNumber,
    fee,
    from_owner: fromOwner,
    hash,
    timestamp,
    to_owner: toOwner
  } = extrinsic || {};

  return (
    <>
      <Heading>{`Extrinsic ${blockIndex}`}</Heading>
      <ExtrinsicWrapper>
        <Text
          color={'grey-500'}
        >
          Block
        </Text>
        <Text>{blockNumber?.toString() || ''}</Text>
        <Text
          color={'grey-500'}
        >
          Timestamp
        </Text>
        <Text>
          {timestamp ? new Date(timestamp * 1000).toLocaleString() : ''}
        </Text>
      </ExtrinsicWrapper>
      <ExtrinsicWrapper>
        <Text
          color={'grey-500'}
        >
          Sender
        </Text>
        <div>
          {fromOwner && (
            <AccountLinkComponent
              noShort={deviceSize !== DeviceSize.sm}
              size={'m'}
              value={fromOwner}
            />
          )}
        </div>
        <Text
          color={'grey-500'}
        >
          Destination
        </Text>
        <div>
          {toOwner && (
            <AccountLinkComponent
              noShort={deviceSize !== DeviceSize.sm}
              size={'m'}
              value={toOwner}
            />
          )}
        </div>
      </ExtrinsicWrapper>
      <ExtrinsicWrapper>
        <Text
          color={'grey-500'}
        >
          Amount
        </Text>
        {/* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */}
        <div>
          <ChainLogo isInline={true} />
          {Number(amount) || 0} {chainData?.properties.tokenSymbol}
        </div>
        <Text
          color={'grey-500'}
        >
          Fee
        </Text>
        <div>
          <ChainLogo isInline={true} />
          {Number(fee) || 0} {chainData?.properties.tokenSymbol}
        </div>
      </ExtrinsicWrapper>
      <ExtrinsicWrapper>
        {hash && <><Text
          color={'grey-500'}
        >
          Hash
        </Text>
        <Text>
          {deviceSize !== DeviceSize.sm ? hash : shortcutText(hash)}
        </Text></>}
        <Text
          color={'grey-500'}
        >
          Extrinsic
        </Text>
        <Text>{blockIndex}</Text>
      </ExtrinsicWrapper>
    </>
  );
};

const ExtrinsicWrapper = styled.div`
  display: grid;
  grid-column-gap: var(--gap);
  border-bottom: 1px dashed var(--border-color);
  grid-template-columns: 85px 1fr;
  grid-row-gap: var(--gap);
  padding: calc(var(--gap) * 1.5) 0;
  font-size: 16px;
  line-height: 20px;
  &:nth-child(2) {
    padding-top: 0;
  }
  @media (max-width: 767px) {
    grid-row-gap: 0;
    div {
      grid-column: span 2;
      margin-top: calc(var(--gap) / 4);
    }
  }
`;

export default ExtrinsicDetail;
