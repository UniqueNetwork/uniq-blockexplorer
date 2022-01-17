import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Heading, InputText } from '@unique-nft/ui-kit'
import { useGraphQlBlocks } from '../../api/graphQL/block'
import { useGraphQlLastTransfers } from '../../api/graphQL/transfers'
import { useApi } from '../../hooks/useApi'
import LastTransfersComponent from './components/LastTransfersComponent'
import LastBlocksComponent from './components/LastBlocksComponent'

const MainPage = () => {
  const pageSize = 10 // default
  const [searchString, setSearchString] = useState('')

  const { chainData } = useApi()

  const { fetchMoreBlocks, blocks, blockCount, isBlocksFetching } = useGraphQlBlocks({ pageSize })

  const { fetchMoreTransfers, transfers, transfersCount, isTransfersFetching } =
    useGraphQlLastTransfers({ pageSize })

  const navigate = useNavigate()

  const onBlocksPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreBlocks({
        limit,
        offset,
      }),
    [fetchMoreBlocks]
  )

  const onTransfersPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreTransfers({
        limit,
        offset,
      }),
    [fetchMoreTransfers]
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

    const prettifiedBlockSearchString = searchString.match(/[^$,.\d]/) ? '-1' : searchString

    fetchMoreBlocks({
      searchString:
        searchString && searchString.length > 0 ? prettifiedBlockSearchString : undefined,
    })
    fetchMoreTransfers({
      searchString,
    })
  }, [fetchMoreTransfers, fetchMoreBlocks, searchString, navigate])

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') onSearchClick()
    },
    [onSearchClick]
  )

  return (
    <Wrapper>
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
        <Heading size={'2'}>{`Last ${chainData?.properties.tokenSymbol} transfers`}</Heading>
        <LastTransfersComponent
          data={transfers}
          count={transfersCount}
          loading={isTransfersFetching}
          onPageChange={onTransfersPageChange}
          pageSize={pageSize}
        />
      </div>
      <div className={'main-block-container'}>
        <Heading size={'2'}>Last blocks</Heading>
        <LastBlocksComponent
          data={blocks}
          count={blockCount || 0}
          loading={isBlocksFetching}
          onPageChange={onBlocksPageChange}
          pageSize={pageSize}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  > .search-wrap {
    display: flex;
    .input-width-612 {
      box-sizing: border-box;
      width: 612px;
      margin-right: calc(var(--gap) / 2);
    }
  }
  > .main-block-container {
    padding-top: calc(var(--gap) * 2);
  }
`

export default MainPage
