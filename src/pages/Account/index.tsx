import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs } from '@unique-nft/ui-kit'
import AccountDetailComponent from './components/AccountDetailComponent'
import LastTransfersComponent from '../Main/components/LastTransfersComponent'
import { transfers as gqlTransfers } from '../../api/graphQL'
import CollectionsComponent from './components/CollectionsComponent'
import TokensComponent from './components/TokensComponent'

const assetsTabs = ['Collections', 'Tokens']

const AccountPage = () => {
  const { accountId } = useParams()

  const pageSize = 10 // default

  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0)

  const { fetchMoreTransfers, transfers, transfersCount, isTransfersFetching } =
    gqlTransfers.useGraphQlLastTransfers({ pageSize, accountId })

  const onTransfersPageChange = useCallback(
    (limit: number, offset: number) => {
      return fetchMoreTransfers({
        limit,
        offset,
      })
    },
    [fetchMoreTransfers]
  )

  if (!accountId) return null

  return (
    <div>
      <AccountDetailComponent accountId={accountId} />
      <h2 className={'margin-top'}>Assets</h2>
      <Tabs
        activeIndex={activeAssetsTabIndex}
        labels={assetsTabs}
        onClick={setActiveAssetsTabIndex}
      />
      <Tabs
        activeIndex={activeAssetsTabIndex}
        contents={[
          <CollectionsComponent accountId={accountId} key={'collections'} />,
          <TokensComponent accountId={accountId} key={'tokens'} />,
        ]}
      />
      <h2 className={'margin-top margin-bottom'}>Last QTZ transfers</h2>
      <LastTransfersComponent
        data={transfers}
        count={transfersCount}
        onPageChange={onTransfersPageChange}
        pageSize={pageSize}
        loading={isTransfersFetching}
      />
    </div>
  )
}

export default AccountPage
