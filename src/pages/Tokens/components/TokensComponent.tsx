import { Skeleton } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Token, useGraphQlTokens } from '@app/api';
import { Pagination, ScrollableTable } from '@app/components';
import { DeviceSize, useApi, useDeviceSize, useSearchFromQuery } from '@app/hooks';

import { TokensComponentProps } from '../types';
import { getTokensColumns } from './tokensColumnsSchema';
import TokensGrid from './TokensGrid';

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

const TokensComponent: FC<TokensComponentProps> = ({
  currentPage,
  orderBy,
  pageSize,
  searchString,
  setCurrentPage,
  setSearchString,
  setOrderBy,
  view,
}) => {
  const deviceSize = useDeviceSize();
  const searchFromQuery = useSearchFromQuery();
  const { currentChain } = useApi();

  const { accountId, collectionId } = useParams();

  const { isTokensFetching, timestamp, tokens, tokensCount } = useGraphQlTokens({
    filter: filter({ accountId, collectionId }),
    offset: (currentPage - 1) * pageSize,
    orderBy,
    pageSize,
    searchString,
  });

  useEffect(() => {
    setSearchString(searchFromQuery);
  }, [searchFromQuery, setSearchString]);

  const tokenColumns = useMemo(() => {
    return getTokensColumns(currentChain.network, orderBy, setOrderBy);
  }, [currentChain.network, orderBy, setOrderBy]);

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `token-${(item as Token).collection_id}-${(item as Token).token_id}`,
    [],
  );

  return (
    <Wrapper>
      <Pagination
        count={tokensCount || 0}
        currentPage={currentPage}
        pageSize={pageSize}
        siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
        onPageChange={setCurrentPage}
      />
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .pagination {
    margin-bottom: calc(var(--gap) * 2.25);
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
