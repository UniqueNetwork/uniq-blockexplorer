import { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';

import { useDeviceSize, DeviceSize, useScrollToTop } from '@app/hooks';
import {
  formatAmount,
  formatBlockNumber,
  shortcutText,
  timestampFormat,
} from '@app/utils';
import { Extrinsic } from '@app/api';

import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import ChainLogo from '../../../components/ChainLogo';

interface ExtrinsicDetailProps {
  blockIndex: string;
  extrinsic: Extrinsic;
  index: number;
}

const ExtrinsicDetail: FC<ExtrinsicDetailProps> = ({ blockIndex, extrinsic, index }) => {
  useScrollToTop();
  const deviceSize = useDeviceSize();

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
    to_owner: toOwner,
  } = extrinsic || {};

  return (
    <ExtrinsicWrapper>
      <div>
        <Heading>{`Extrinsic ${index}`}</Heading>
        <ExtrinsicDataWrapper>
          <Text color="grey-500">Block</Text>
          <Text>{formatBlockNumber(blockNumber)}</Text>
          <Text color="grey-500">Timestamp</Text>
          <Text>{timestamp ? timestampFormat(timestamp) : ''}</Text>
        </ExtrinsicDataWrapper>
        <ExtrinsicDataWrapper>
          <Text color="grey-500">From</Text>
          <div>
            {fromOwner && (
              <AccountLinkComponent
                noShort={deviceSize >= DeviceSize.md}
                size="m"
                value={fromOwner}
              />
            )}
          </div>
          <Text color="grey-500">To</Text>
          <div>
            {toOwner && (
              <AccountLinkComponent
                noShort={deviceSize >= DeviceSize.md}
                size="m"
                value={toOwner}
              />
            )}
          </div>
        </ExtrinsicDataWrapper>
        <ExtrinsicDataWrapper>
          <Text color="grey-500">Amount</Text>
          {/* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */}
          <ChainLogoWrapper>
            <ChainLogo isInline={true} />
            <Text>{`${formatAmount(amount || 0)}`}</Text>
          </ChainLogoWrapper>
          <Text color="grey-500">Fee</Text>
          <ChainLogoWrapper>
            <ChainLogo isInline={true} />
            <Text>{`${formatAmount(fee || 0)}`}</Text>
          </ChainLogoWrapper>
        </ExtrinsicDataWrapper>
        <ExtrinsicDataWrapper>
          {hash && (
            <>
              <Text color="grey-500">Hash</Text>
              <Text>{deviceSize >= DeviceSize.md ? hash : shortcutText(hash)}</Text>
            </>
          )}
          <Text color="grey-500">Extrinsic</Text>
          <Text>{blockIndex}</Text>
          <Text color="grey-500">Method</Text>
          <Text>{method || ''}</Text>
          <Text color="grey-500">Section</Text>
          <Text>{section || ''}</Text>
          <Text color="grey-500">Result</Text>
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
    & > div,
    & > span {
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
