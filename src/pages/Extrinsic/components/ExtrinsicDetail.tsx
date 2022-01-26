import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
  Data as extrinsicData,
  extrinsicQuery,
  Variables as ExtrinsicVariables,
} from '../../../api/graphQL/extrinsic'
import AccountLinkComponent from '../../Account/components/AccountLinkComponent'
import LoadingComponent from '../../../components/LoadingComponent'
import { Heading } from '@unique-nft/ui-kit'
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize'
import { formatAmount, formatBlockNumber, shortcutText } from '../../../utils/textUtils'
import config from '../../../config'
import { timestampFormat } from '../../../utils/timestampUtils'

const ExtrinsicDetail: FC = () => {
  const { blockIndex } = useParams()

  const { loading: isExtrinsicFetching, data: extrinsics } = useQuery<
    extrinsicData,
    ExtrinsicVariables
  >(extrinsicQuery, {
    variables: { block_index: blockIndex || '' },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  const deviceSize = useDeviceSize()

  if (!blockIndex) return null

  if (isExtrinsicFetching) return <LoadingComponent />

  const {
    block_number: blockNumber,
    from_owner: fromOwner,
    to_owner: toOwner,
    timestamp,
    amount,
    fee,
    hash,
  } = extrinsics?.view_extrinsic[0] || {}

  return (
    <>
      <Heading>{`Extrinsic ${blockIndex}`}</Heading>
      <div className={'grid-container container-with-border grid-container_extrinsic-container'}>
        <div className={'grid-item_col1 text_grey'}>Block</div>
        <div className={'grid-item_col11'}>{formatBlockNumber(blockNumber)}</div>
        <div className={'grid-item_col1 text_grey'}>Timestamp</div>
        <div className={'grid-item_col11'}>
          {timestamp && timestampFormat(timestamp)}
        </div>
      </div>
      <div className={'grid-container container-with-border grid-container_extrinsic-container'}>
        <div className={'grid-item_col1 text_grey'}>Sender</div>
        <div className={'grid-item_col11'}>
          {fromOwner && (
            <AccountLinkComponent value={fromOwner} noShort={deviceSize !== DeviceSize.sm} />
          )}
        </div>
        <div className={'grid-item_col1 text_grey'}>Destination</div>
        <div className={'grid-item_col11'}>
          {toOwner && (
            <AccountLinkComponent value={toOwner} noShort={deviceSize !== DeviceSize.sm} />
          )}
        </div>
      </div>
      <div className={'grid-container container-with-border grid-container_extrinsic-container'}>
        <div className={'grid-item_col1 text_grey'}>Amount</div>
        {/* TODO: due to API issues - amount of some transactions is object which is, for now, should be translated as zero */}
        <div className={'grid-item_col11 flexbox-container'}>
          <img src={`/logos/${config.TOKEN_LOGO}`} height={22} width={22} />
          {formatAmount(Number(amount))} {config.TOKEN_ID}
        </div>
        <div className={'grid-item_col1 text_grey'}>Fee</div>
        <div className={'grid-item_col11 flexbox-container'}>
          <img src={`/logos/${config.TOKEN_LOGO}`} height={22} width={22} />
          {formatAmount(Number(fee))} {config.TOKEN_ID}
        </div>
      </div>
      <div className={'grid-container grid-container_extrinsic-container'}>
        <div className={'grid-item_col1 text_grey'}>Hash</div>
        <div className={'grid-item_col11'}>
          {hash && deviceSize !== DeviceSize.sm ? hash : shortcutText(hash!)}
        </div>
        <div className={'grid-item_col1 text_grey'}>Extrinsic</div>
        <div className={'grid-item_col11'}>{blockIndex}</div>
      </div>
    </>
  )
}

export default ExtrinsicDetail
