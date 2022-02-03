import React, { FC } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Heading, Text } from '@unique-nft/ui-kit';

import { extrinsic as gqlExtrinsic } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { formatAmount, formatBlockNumber, shortcutText } from '../../../utils/textUtils';
import ChainLogo from '../../../components/ChainLogo';
import { useApi } from '../../../hooks/useApi';
import Picture from '../../../components/Picture';
import { timestampFormat } from '../../../utils/timestampUtils';

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

  // TODO: need access to NFT by extrinsic, that is just mock:
  const tokenMock = {
    collection_id: 3245,
    collection_name: 'Crypto Duckies',
    prefix: 'Duckie',
    token_id: 5498
  };

  return (
    <ExtrinsicWrapper>
      <TokenWrapper>
        <TokenPicture alt={`${tokenMock.prefix} #${tokenMock.token_id}`} />
        <TokenTitle>
          <Text
            color={'secondary-500'}
            size={'l'}
            weight={'medium'}
          >{`${tokenMock.prefix} #${tokenMock.token_id}`}</Text>
          <Link to={'/'}>{`${tokenMock.collection_name} [ID ${tokenMock.collection_id}]`}</Link>
        </TokenTitle>
      </TokenWrapper>
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
                noShort={deviceSize !== DeviceSize.sm}
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
            {deviceSize !== DeviceSize.sm ? hash : shortcutText(hash)}
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

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--gap);
  width: 216px;
`;

const TokenPicture = styled(Picture)`
  width: 216px;
  height: 216px;
`;

const TokenTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--gap) / 4);
  width: 216px;
  span, a {
    word-break: break-word;
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
