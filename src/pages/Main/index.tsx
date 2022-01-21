import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, InputText } from '@unique-nft/ui-kit';
import { useApi } from '../../hooks/useApi';
import LastTransfersComponent from './components/LastTransfersComponent';
import LastBlocksComponent from './components/LastBlocksComponent';
import { lastBlocks, transfers as gqlTransfers } from '../../api/graphQL/';

const MainPage = () => {
  const pageSize = 10; // default
  const [searchString, setSearchString] = useState('');

  const { chainData } = useApi();

  const { blockCount, blocks, fetchMoreBlocks, isBlocksFetching } = lastBlocks.useGraphQlBlocks({
    pageSize
  });

  const { fetchMoreTransfers, isTransfersFetching, transfers, transfersCount } =
    gqlTransfers.useGraphQlLastTransfers({ pageSize });

  const navigate = useNavigate();

  const onBlocksPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreBlocks({
        limit,
        offset
      }),
    [fetchMoreBlocks]
  );

  const onTransfersPageChange = useCallback(
    (limit: number, offset: number) =>
      fetchMoreTransfers({
        limit,
        offset
      }),
    [fetchMoreTransfers]
  );

  const onSearchClick = useCallback(() => {
    if (/^\w{48}\w*$/.test(searchString)) {
      navigate(`/account/${searchString}`);

      return;
    }

    if (/^\d+-\d+$/.test(searchString)) {
      navigate(`/extrinsic/${searchString}`);

      return;
    }

    const prettifiedBlockSearchString = searchString.match(/[^$,.\d]/) ? '-1' : searchString;

    fetchMoreBlocks({
      searchString:
        searchString && searchString.length > 0 ? prettifiedBlockSearchString : undefined
    }).catch((errMsg) => console.error(errMsg));
    fetchMoreTransfers({
      searchString
    }).catch((errMsg) => console.error(errMsg));
  }, [fetchMoreTransfers, fetchMoreBlocks, searchString, navigate]);

  const onSearchKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') onSearchClick();
    },
    [onSearchClick]
  );

  const onChangeSearchString = useCallback((value: string | undefined) => {
    setSearchString(value?.toString() || '');
  }, [setSearchString]);

  return (
    <div>
      <div className={'search-wrap'}>
        <InputText
          className={'input-width-612'}
          iconLeft={{ name: 'magnify', size: 18 }}
          onChange={onChangeSearchString}
          onKeyDown={onSearchKeyDown}
          placeholder={'Extrinsic / account'}
        />
        <Button
          onClick={onSearchClick}
          role={'primary'}
          title='Search'
        />
      </div>
      <div className={'main-block-container'}>
        <Heading size={'2'}>{`Last ${chainData?.properties.tokenSymbol || ''} transfers`}</Heading>
        <LastTransfersComponent
          count={transfersCount}
          data={transfers}
          loading={isTransfersFetching}
          onPageChange={onTransfersPageChange}
          pageSize={pageSize}
        />
      </div>
      <div className={'main-block-container'}>
        <Heading size={'2'}>Last blocks</Heading>
        <LastBlocksComponent
          count={blockCount || 0}
          data={blocks}
          loading={isBlocksFetching}
          onPageChange={onBlocksPageChange}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default MainPage;
