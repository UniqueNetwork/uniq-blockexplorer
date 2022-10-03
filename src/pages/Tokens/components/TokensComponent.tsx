import { Skeleton } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { FC, useContext, useMemo } from 'react';
import styled from 'styled-components';

import { Token, useGraphQlTokens } from '@app/api';
import {
  Pagination,
  ScrollableTable,
  Search,
  SelectOptionProps,
  ViewType,
} from '@app/components';
import { DeviceSize, DeviceSizes, deviceWidth, useApi, useDeviceSize } from '@app/hooks';
import ToolbarContext from '@app/toolbarContext/toolbarContext';

import { getTokensColumns } from './tokensColumnsSchema';
import TokensGrid from './TokensGrid';

const filter = ({
  accountId,
  collectionId,
}: {
  accountId: string | null;
  collectionId: string | null;
}) => {
  let _filter = {};

  if (accountId) {
    _filter = {
      _or: [{ owner: { _eq: accountId } }, { owner_normalized: { _eq: accountId } }],
    };
  }

  if (collectionId)
    _filter = { ..._filter, collection_id: { _eq: Number(collectionId) } };

  return _filter;
};

interface TokensComponentProps {
  currentPage: number;
  pageSize: SelectOptionProps;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: SelectOptionProps) => void;
}

const TokensComponent: FC<TokensComponentProps> = ({
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
}) => {
  const deviceSize = useDeviceSize();
  const { view, searchString, setSearchString, queryParams, orderBy, setOrderBy } =
    useContext(ToolbarContext);
  const { currentChain } = useApi();

  const accountId = queryParams.get('accountId');
  const collectionId = queryParams.get('collectionId');
  const pageSizeNumber = pageSize.id as number;

  const { isTokensFetching, timestamp, tokens, tokensCount } = useGraphQlTokens({
    filter: filter({ accountId, collectionId }),
    offset: (currentPage - 1) * pageSizeNumber,
    orderBy,
    pageSize: pageSizeNumber,
    searchString,
  });

  const tokenColumns = getTokensColumns(currentChain.network, orderBy, setOrderBy);

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `token-${(item as Token).collection_id}-${(item as Token).token_id}`,
    [],
  );

  const onSearchChange = (value: string) => {
    setSearchString(value);
    setCurrentPage(1);
  };

  return (
    <Wrapper>
      <Search
        placeholder="NFT / collection"
        // value={searchString}
        onSearchChange={onSearchChange}
      />
      <TopPaginationContainer>
        <Pagination
          count={tokensCount || 0}
          currentPage={currentPage}
          itemsName="NFTs"
          pageSize={pageSize}
          setPageSize={setPageSize}
          siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
          onPageChange={setCurrentPage}
        />
      </TopPaginationContainer>
      {isTokensFetching ? (
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      ) : (
        <>
          {view === ViewType.List ? (
            <ScrollableTable
              columns={tokenColumns}
              data={tokens || []}
              loading={isTokensFetching}
              rowKey={getRowKey}
            />
          ) : (
            <div>
              <TokensGrid
                chainNetwork={currentChain.network}
                timestamp={timestamp}
                tokens={tokens || []}
              />
            </div>
          )}
        </>
      )}
      <BottomPaginationContainer>
        <Pagination
          count={tokensCount || 0}
          currentPage={currentPage}
          itemsName="NFTs"
          pageSize={pageSize}
          setPageSize={setPageSize}
          siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
          onPageChange={setCurrentPage}
        />
      </BottomPaginationContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  > :first-of-type {
    margin-bottom: calc(var(--gap) * 1.5);
  }
  .global-search {
    @media ${deviceWidth.smallerThan.lg} {
      display: none;
    }
  }
  .pagination {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    .count-with-page-size {
      display: flex;
      align-items: center;
      grid-column-gap: calc(var(--gap) * 2.5);

      .page-size {
        display: flex;
        grid-column-gap: calc(var(--gap) / 2);
        align-items: center;

        .unique-select {
          width: 72px;
        }
      }

      @media (max-width: ${DeviceSizes.sm}) {
        grid-column-gap: var(--gap);
      }
    }
  }
`;

const TopPaginationContainer = styled.div`
  .pagination {
    margin-bottom: calc(var(--gap) * 2);
  }
`;

const BottomPaginationContainer = styled.div`
  .pagination {
    margin-top: calc(var(--gap) * 2.25);
  }
`;

const SkeletonWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-grow: 1;

  .unique-skeleton {
    width: 100%;
    min-height: 1200px;
    border-radius: var(--gap) !important;
  }
`;

export default TokensComponent;
