import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  Data as AccountData,
  Variables as AccountVariables,
  accountQuery,
} from '../../../api/graphQL/account'
import Avatar from '../../../components/Avatar'
import LoadingComponent from '../../../components/LoadingComponent'
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize'
import { formatAmount, shortcutText } from '../../../utils/textUtils'
import config from '../../../config'

interface AccountProps {
  accountId: string
}

const AccountDetailComponent: FC<AccountProps> = (props) => {
  const { accountId } = props

  const {
    loading: isAccountFetching,
    error: fetchAccountError,
    data: account,
  } = useQuery<AccountData, AccountVariables>(accountQuery, {
    variables: { accountId },
    notifyOnNetworkStatusChange: true,
  })

  const deviceSize = useDeviceSize()

  if (isAccountFetching) return <LoadingComponent />

  const {
    timestamp,
    free_balance: freeBalance,
    locked_balance: lockedBalance,
    available_balance: availableBalance,
  } = account?.account_by_pk || {}

  return (
    <div className={'container-with-border'}>
      <div className={'grid-container grid-container_account-container'}>
        <div className={'grid-item_col1'}>
          <Avatar size="large" />
        </div>
        <div
          className={
            'flexbox-container flexbox-container_column flexbox-container_without-gap grid-item_col11'
          }
        >
          <div>Account name</div>
          <h2>
            {deviceSize === DeviceSize.sm || deviceSize === DeviceSize.md
              ? shortcutText(accountId)
              : accountId}
          </h2>
        </div>
        <div className={'grid-item_col1 text_grey margin-top'}>Balance</div>
        <div className={'grid-item_col11 flexbox-container flexbox-container_wrap margin-top'}>
          <span>
            {freeBalance ? formatAmount(Number(freeBalance)) : 'unavailable'} {config.TOKEN_ID} (total){' '}
          </span>
          <span className={'text_grey'}>
            {lockedBalance ? formatAmount(Number(lockedBalance)) : 'unavailable'} {config.TOKEN_ID} (locked){' '}
          </span>
          <span className={'text_grey'}>
            {availableBalance ? formatAmount(Number(availableBalance)) : 'unavailable'} {config.TOKEN_ID} (transferable){' '}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AccountDetailComponent
