import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Button, Heading, InputText } from '@unique-nft/ui-kit'
import {
  Data as BlocksData,
  getLatestBlocksQuery,
  Variables as BlocksVariables,
} from '../../api/graphQL/block'
import {
  Data as TransfersData,
  getLastTransfersQuery,
  Variables as TransferVariables,
} from '../../api/graphQL/transfers'
import LastTransfersComponent from './components/LastTransfersComponent'
import LastBlocksComponent from './components/LastBlocksComponent'
import config from '../../config'

const MainPage = () => {
  const pageSize = 10 // default
  const [searchString, setSearchString] = useState('')
  const {
    fetchMore: fetchMoreBlocks,
    loading: isBlocksFetching,
    error: fetchBlocksError,
    data: blocks,
  } = useQuery<BlocksData, BlocksVariables>(getLatestBlocksQuery, {
    variables: { limit: pageSize, offset: 0, order_by: { block_number: 'desc' } },
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  })

  const {
    fetchMore: fetchMoreTransfers,
    loading: isTransfersFetching,
    error: fetchTransfersError,
    data: transfers,
  } = useQuery<TransfersData, TransferVariables>(getLastTransfersQuery, {
    variables: { limit: pageSize, offset: 0, where: { amount: { _neq: '0' } } },
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  })

  const navigate = useNavigate()

  const onBlocksPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreBlocks({
        variables: {
          limit,
          offset,
        },
      }),
    [fetchMoreBlocks, searchString]
  )
  const onTransfersPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreTransfers({
        variables: {
          limit,
          offset,
        },
      }),
    [fetchMoreTransfers, searchString]
  )

  const onSearchClick = useCallback(() => {
    if (/^\w{48}\w*$/.test(searchString)) {
      navigate(`/account/${searchString}`)
      return
    }

    if (/^\d+-\d+$/.test(searchString)) {
      navigate(`/extrinsic/${searchString}`)
      return
    }

    const prettifiedBlockSearchString = searchString.match(/[^$,.\d]/) ? -1 : searchString

    fetchMoreBlocks({
      variables: {
        where:
          (searchString &&
            searchString.length > 0 && { block_number: { _eq: prettifiedBlockSearchString } }) ||
          undefined,
      },
    })
    fetchMoreTransfers({
      variables: {
        where:
          (searchString &&
            searchString.length > 0 && {
              _or: [
                {
                  block_index: { _eq: searchString },
                },
                {
                  from_owner: { _eq: searchString },
                },
                { to_owner: { _eq: searchString } },
              ],
            }) ||
          undefined,
      },
    })
  }, [fetchMoreTransfers, fetchMoreBlocks, searchString])

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') onSearchClick()
    },
    [onSearchClick]
  )

  return (
    <div>
      <div className={'search-wrap'}>
        <InputText
          placeholder={'Extrinsic / account'}
          className={'input-width-612'}
          iconLeft={{ name: 'magnify', size: 18 }}
          onChange={(value) => setSearchString(value?.toString() || '')}
          onKeyDown={onSearchKeyDown}
        />
        <Button onClick={onSearchClick} title="Search" role={'primary'} />
      </div>
      <div className={'main-block-container'}>
        <Heading size={'2'}>{`Last ${config.TOKEN_ID} transfers`}</Heading>
        <LastTransfersComponent
          data={transfers}
          loading={isTransfersFetching}
          pageSize={pageSize}
          onPageChange={onTransfersPageChange}
        />
      </div>
      <div className={'main-block-container'}>
        <Heading size={'2'}>Last blocks</Heading>
        <LastBlocksComponent
          data={blocks}
          loading={isBlocksFetching}
          onPageChange={onBlocksPageChange}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}

export default MainPage
