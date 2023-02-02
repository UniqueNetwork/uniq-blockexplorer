import { Skeleton } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { FC, useMemo } from 'react';
import styled from 'styled-components/macro';

import { Token, TokenSorting, useGraphQlTokens } from '@app/api';
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  Pagination,
  ScrollableTable,
  SelectOptionProps,
  ViewType,
} from '@app/components';
import { DeviceSize, useApi, useDeviceSize, useQueryParams } from '@app/hooks';
import { ContentWrapper } from '@app/components/ContentWrapper';

import { getTokensColumns } from './tokensColumnsSchema';
import TokensGrid from './TokensGrid';

const filter = ({
  accountId,
  collectionId,
}: {
  accountId?: string;
  collectionId?: string;
}) => {
  let _filter: any = {
    burned: { _eq: 'false' },
    type: { _eq: 'NFT' },
  };

  if (accountId) {
    _filter = {
      ..._filter,
      tokens_owner: { _eq: accountId },
    };
  }

  if (collectionId) {
    _filter = {
      ..._filter,
      collection_id: { _eq: Number(collectionId) },
    };
  }

  return _filter;
};

interface TokensComponentProps {
  currentPage: number;
  orderBy: TokenSorting;
  pageSize: SelectOptionProps;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: SelectOptionProps) => void;
  setOrderBy: (orderBy: TokenSorting) => void;
  view: ViewType;
}

const TokensComponent: FC<TokensComponentProps> = ({
  currentPage,
  orderBy,
  pageSize,
  setCurrentPage,
  setPageSize,
  setOrderBy,
  view,
}) => {
  const deviceSize = useDeviceSize();
  const { accountId, collectionId, searchString, attributes } = useQueryParams();
  const { currentChain } = useApi();

  const pageSizeNumber = pageSize.id as number;

  const attributesFilter = useMemo(() => {
    setCurrentPage(1);
    return JSON.parse(attributes || '{}')?.attributes;
  }, [attributes]);

  const { isTokensFetching, timestamp, tokens, tokensCount } = useGraphQlTokens({
    filter: filter({ accountId, collectionId }),
    offset: (currentPage - 1) * pageSizeNumber,
    orderBy,
    pageSize: pageSizeNumber,
    searchString,
    attributesFilter,
  });

  const tokenColumns = getTokensColumns(
    currentChain.network,
    orderBy,
    setOrderBy,
    timestamp,
  );

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `token-${(item as Token).collection_id}-${(item as Token).token_id}`,
    [],
  );

  return (
    <ContentWrapper>
      <TopPaginationContainer>
        <Pagination
          count={tokensCount || 0}
          currentPage={currentPage}
          itemName="NFT"
          pageSize={pageSize}
          setPageSize={setPageSize}
          siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
          pageSizeOptions={[
            ...DEFAULT_PAGE_SIZE_OPTIONS,
            { id: 48, title: '48' },
            { id: 60, title: '60' },
          ]}
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
            <TokensGridWrapper>
              <TokensGrid
                chainNetwork={currentChain.network}
                timestamp={timestamp}
                tokens={tokens || []}
                loading={isTokensFetching}
              />
            </TokensGridWrapper>
          )}
        </>
      )}
      {!isTokensFetching && !!tokensCount && (
        <BottomPaginationContainer>
          <Pagination
            count={tokensCount || 0}
            currentPage={currentPage}
            itemName="NFT"
            pageSize={pageSize}
            setPageSize={setPageSize}
            siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
            pageSizeOptions={[
              ...DEFAULT_PAGE_SIZE_OPTIONS,
              { id: 48, title: '48' },
              { id: 60, title: '60' },
            ]}
            onPageChange={setCurrentPage}
          />
        </BottomPaginationContainer>
      )}
    </ContentWrapper>
  );
};

const TokensGridWrapper = styled.div`
  flex: 1;
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
