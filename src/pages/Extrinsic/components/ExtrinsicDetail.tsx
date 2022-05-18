import React, { FC } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Heading, Text } from '@unique-nft/ui-kit';

import { extrinsic as gqlExtrinsic } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { formatAmount, formatBlockNumber, shortcutText } from '../../../utils/textUtils';
import ChainLogo from '../../../components/ChainLogo';
import { useApi } from '@app/hooks';
import { timestampFormat } from '@app/utils';

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
    method,
    section,
    success,
    timestamp,
    to_owner: toOwner
  } = extrinsic || {};

  return (
    <ExtrinsicWrapper>
      <div>
        <Heading>{`Extrinsic ${blockIndex}`}</Heading>
        <ExtrinsicDataWrapper>
          <Text
            color={'grey-500'}
          >
            Block
          </Text>
          <Text>{formatBlockNumber(blockNumber)}</Text>
          <Text
            color={'grey-500'}
          >
            Timestamp
          </Text>
          <Text>
            {timestamp ? timestampFormat(timestamp) : ''}
          </Text>
        </ExtrinsicDataWrapper>
        <ExtrinsicDataWrapper>
          <Text
            color={'grey-500'}
          >
            From
          </Text>
          <div>
            {fromOwner && (
              <AccountLinkComponent
                noShort={deviceSize >= DeviceSize.md}
                size={'m'}
                value={fromOwner}
              />
            )}
          </div>
          <Text
            color={'grey-500'}
          >
            To
          </Text>
          <div>
            {toOwner && (
              <AccountLinkComponent
                noShort={deviceSize >= DeviceSize.md}
                size={'m'}
                value={toOwner}
              />
            )}
          </div>
        </ExtrinsicDataWrapper>
        <ExtrinsicDataWrapper>
          <Text
            color={'grey-500'}
          >
            Amount
          </Text>
          {/* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */}
          <ChainLogoWrapper>
            <ChainLogo isInline={true} />
            <Text>{`${formatAmount(amount || 0)} ${chainData?.properties.tokenSymbol || ''}`}</Text>
          </ChainLogoWrapper>
          <Text
            color={'grey-500'}
          >
            Fee
          </Text>
          <ChainLogoWrapper>
            <ChainLogo isInline={true} />
            <Text>{`${formatAmount(fee || 0)} ${chainData?.properties.tokenSymbol || ''}`}</Text>
          </ChainLogoWrapper>
        </ExtrinsicDataWrapper>
        <ExtrinsicDataWrapper>
          {hash && <><Text
            color={'grey-500'}
          >
            Hash
          </Text>
          <Text>
            {deviceSize >= DeviceSize.md ? hash : shortcutText(hash)}
          </Text></>}
          <Text
            color={'grey-500'}
          >
            Extrinsic
          </Text>
          <Text>{blockIndex}</Text>
          <Text
            color={'grey-500'}
          >
            Method
          </Text>
          <Text>{method || ''}</Text>
          <Text
            color={'grey-500'}
          >
            Section
          </Text>
          <Text>{section || ''}</Text>
          <Text
            color={'grey-500'}
          >
            Result
          </Text>
          <Text>{success ? 'Success' : 'Error'}</Text>
        </ExtrinsicDataWrapper>
      </div>
    </ExtrinsicWrapper>
  );
};

const ExtrinsicWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: calc(var(--gap) * 2);
  div:last-child {
    flex-grow: 1;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    row-gap: calc(var(--gap) * 2);
  }
`;

const ExtrinsicDataWrapper = styled.div`
  display: grid;
  grid-column-gap: var(--gap);
  border-bottom: 1px dashed var(--border-color);
  grid-template-columns: 85px 1fr;
  grid-row-gap: var(--gap);
  padding: calc(var(--gap) * 1.5) 0;
  font-size: 16px;
  line-height: 20px;
  * {
    vertical-align: middle;
  }
  &:nth-child(2) {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 767px) {
    grid-row-gap: 0;
    &>div, &>span {
      grid-column: span 2;
      margin-top: calc(var(--gap) / 2);
      &:nth-child(even) {
        margin-top: calc(var(--gap) / 4);
      }
    }
    
  }
`;

const ChainLogoWrapper = styled.div`
  display: flex;
  column-gap: calc(var(--gap) / 2);
  align-items: center;
`;

export default ExtrinsicDetail;
