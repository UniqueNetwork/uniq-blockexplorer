import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { InputText } from '@unique-nft/ui-kit'
import Button from '../../components/Button'
import {
  getLatestBlocksQuery,
  Data as BlocksData,
  Variables as BlocksVariables,
} from '../../api/graphQL/block'
import {
  getLastTransfersQuery,
  Data as TransfersData,
  Variables as TransferVariables,
} from '../../api/graphQL/transfers'
import LastTransfersComponent from './components/LastTransfersComponent'
import LastBlocksComponent from './components/LastBlocksComponent'

const NothingFoundComponent = () => <span>Nothing found by you search request.</span>

const MainPage = () => {
  const pageSize = 10 // default
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();
  const [searchString, setSearchString] = useState(queryParams.get('search') || '')

  const getSearchBlockVariables = (_searchString: string | null) => _searchString ? { where: { block_number: { _eq: _searchString } } } : {}
  const getSearchTransfersVariables = (_searchString: string | null) => _searchString ? { where: { block_index: { _eq: _searchString } } } : {}

  const {
    fetchMore: fetchMoreBlocks,
    loading: isBlocksFetching,
    error: fetchBlocksError,
    data: blocks,
  } = useQuery<BlocksData, BlocksVariables>(getLatestBlocksQuery, {
    variables: {
      limit: pageSize,
      offset: parseInt(queryParams.get('blockPage') || '0', 10),
      order_by: { block_number: 'desc' },
      ...getSearchBlockVariables(queryParams.get('search'))
    },
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first'
  })

  const {
    fetchMore: fetchMoreTransfers,
    loading: isTransfersFetching,
    error: fetchTransfersError,
    data: transfers,
  } = useQuery<TransfersData, TransferVariables>(getLastTransfersQuery, {
    variables: {
      limit: pageSize,
      offset: parseInt(queryParams.get('transactionPage') || '0', 10),
      order_by: { block_index: 'desc' },
      ...getSearchTransfersVariables(queryParams.get('search'))
    },
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first'
  })

  const onBlocksPageChange = useCallback(
    (limit: number, offset: number) => {
      queryParams.set('blockPage', (offset / pageSize + 1).toString())
      setQueryParams(queryParams.toString())
    },
    [fetchMoreBlocks, searchString]
  )

  const onTransfersPageChange = useCallback(
    (limit: number, offset: number) => {
      queryParams.set('transactionPage', (offset / pageSize + 1).toString())
      setQueryParams(queryParams.toString())
    },
    [fetchMoreTransfers, searchString]
  )

  const onSearchClick = useCallback(() => {

    if (/^\w{48}$/.test(searchString)) {
      navigate(`/account/${searchString}`)
      return
    }

    if (/^\d+-\d+$/.test(searchString)) {
      navigate(`/extrinsic/${searchString}`)
      return
    }

    if (searchString.trim())
      setQueryParams(`search=${searchString}`);
  }, [fetchMoreTransfers, fetchMoreBlocks, searchString])

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') onSearchClick()
    },
    [onSearchClick]
  )

  return (
    <div>
      <div className={'flexbox-container'}>
        <InputText
          value={searchString}
          placeholder={'Extrinsic / account'}
          onChange={(value) =>setSearchString(value?.toString() || '')}
          onKeyDown={onSearchKeyDown}
        />
        <Button onClick={onSearchClick} text="Search"/>
      </div>
      {/* TODO: keep in mind - QTZ should be changed to different name based on config */}
      {!isBlocksFetching &&
        !isTransfersFetching &&
        !transfers?.view_extrinsic.length &&
        !blocks?.view_last_block.length && <NothingFoundComponent />}
      {!!transfers?.view_extrinsic.length && (
        <div className={'margin-top'}>
          <h2>Last QTZ transfers</h2>
          <LastTransfersComponent
            data={transfers}
            onPageChange={onTransfersPageChange}
            pageSize={pageSize}
            page={parseInt(queryParams.get('transactionPage') || '0', 10)}
          />
        </div>
      )}
      <br />
      {!!blocks?.view_last_block.length && (
        <>
          <h2>Last blocks</h2>
          <LastBlocksComponent
            data={blocks}
            onPageChange={onBlocksPageChange}
            pageSize={pageSize}
            page={parseInt(queryParams.get('blockPage') || '0', 10)}
          />
        </>
      )}
    </div>
  )
}

export default MainPage
