import { Skeleton } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { FC, useMemo } from 'react';
import styled from 'styled-components/macro';

import { Token, TokenSorting, useGraphQlTokens } from '@app/api';
import { Pagination, ScrollableTable, SelectOptionProps } from '@app/components';
import {
  DeviceSize,
  DeviceSizes,
  useApi,
  useDeviceSize,
  useQueryParams,
} from '@app/hooks';
import { useGraphQLTokensTotalHolders } from '@app/api/graphQL/rftTotalHolders/rftTotalHolders';

import { getTokensColumns } from './RFTsColumnsSchema';
import RFTsGrid from './RFTsGrid';

export enum ViewType {
  Grid = 'Grid',
  List = 'List',
}

const filter = ({
  accountId,
  collectionId,
}: {
  accountId?: string;
  collectionId?: string;
}) => {
  let _filter: any = {
    burned: { _eq: 'false' },
    _or: [{ type: { _eq: 'RFT' } }, { type: { _eq: 'FRACTIONAL' } }],
  };

  if (accountId) {
    _filter = {
      ..._filter,
      _or: [{ owner: { _eq: accountId } }, { owner_normalized: { _eq: accountId } }],
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

const RFTsComponent: FC<TokensComponentProps> = ({
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

  const { tokensHolders, isTokensTotalHoldersFetching } = useGraphQLTokensTotalHolders({
    tokens:
      tokens?.map(({ collection_id, token_id }) => ({ collection_id, token_id })) || [],
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

  const tokensWithOwners = useMemo(
    () =>
      tokens?.map((token) => ({
        ...token,
        ownersCount: tokensHolders[`${token.collection_id}_${token.token_id}`] || 0,
      })) || [],
    [tokens, tokensHolders],
  );

  return (
    <Wrapper>
      <TopPaginationContainer>
        <Pagination
          count={tokensCount || 0}
          currentPage={currentPage}
          itemName="RFT"
          pageSize={pageSize}
          setPageSize={setPageSize}
          siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
          onPageChange={setCurrentPage}
        />
      </TopPaginationContainer>
      {isTokensFetching || isTokensTotalHoldersFetching ? (
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      ) : (
        <>
          {view === ViewType.List ? (
            <ScrollableTable
              columns={tokenColumns}
              data={tokensWithOwners}
              loading={isTokensFetching || isTokensTotalHoldersFetching}
              rowKey={getRowKey}
            />
          ) : (
            <div>
              <RFTsGrid
                chainNetwork={currentChain.network}
                timestamp={timestamp}
                tokens={tokensWithOwners}
              />
            </div>
          )}
        </>
      )}
      <BottomPaginationContainer>
        <Pagination
          count={tokensCount || 0}
          currentPage={currentPage}
          itemName="RFT"
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

export default RFTsComponent;
