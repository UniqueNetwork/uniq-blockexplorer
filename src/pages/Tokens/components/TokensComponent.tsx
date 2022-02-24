import React, { FC, useEffect, useMemo, useState } from 'react';
import { DefaultRecordType } from 'rc-table/lib/interface';
import { useParams, useSearchParams } from 'react-router-dom';

import { Token, tokens as gqlTokens, TokenSorting } from '../../../api/graphQL';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import PaginationComponent from '../../../components/Pagination';
import { useApi } from '../../../hooks/useApi';
import { TokensComponentProps } from '../types';
import Table from '../../../components/Table';
import { getTokensColumns } from './tokensColumnsSchema';

const TokensComponent: FC<TokensComponentProps> = ({
  searchString,
  orderBy: defaultOrderBy = { date_of_creation: 'desc' },
  pageSize = 20
}) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  const { collectionId } = useParams<'collectionId'>();
  const [queryParams] = useSearchParams();

  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filter = useMemo(() => {
    const accountId = queryParams.get('accountId');
    let _filter = {};

    if (accountId) _filter = { owner: { _eq: accountId } };

    if (collectionId) _filter = { ..._filter, collection_id: { _eq: collectionId } };

    return _filter;
  }, [collectionId, queryParams]);

  const {
    fetchMoreTokens,
    isTokensFetching,
    tokens,
    tokensCount
  } = gqlTokens.useGraphQlTokens({ filter, orderBy: defaultOrderBy, pageSize });

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;

    void fetchMoreTokens({
      filter,
      limit: pageSize,
      offset,
      orderBy,
      searchString
    });
  }, [pageSize, searchString, currentPage, orderBy, fetchMoreTokens, filter]);

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) => `token-${(item as Token).collection_id}-${(item as Token).token_id}`,
    []
  );

  return (
    <>
      <Table
        columns={getTokensColumns(currentChain.network, orderBy, setOrderBy)}
        data={tokens || []}
        loading={isTokensFetching}
        rowKey={getRowKey}
      />
      <PaginationComponent
        count={tokensCount || 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        siblingCount={deviceSize === DeviceSize.sm ? 1 : 2}
      />
    </>
  );
};

export default TokensComponent;
