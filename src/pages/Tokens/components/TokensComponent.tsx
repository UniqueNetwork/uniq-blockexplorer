import { Icon, Select } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Token, tokens as gqlTokens, TokenSorting } from '../../../api/graphQL';
import PaginationComponent from '../../../components/Pagination';
import SearchComponent from '../../../components/SearchComponent';
import Table from '../../../components/Table';
import { useApi } from '../../../hooks/useApi';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { TokensComponentProps, TokensSelectOption } from '../types';
import { getTokensColumns } from './tokensColumnsSchema';
import TokensGrid from './TokensGrid';

export enum ViewType {
  Grid = 'Grid',
  List = 'List'
}

const options: TokensSelectOption[] = [
  {
    iconRight: { color: '#040B1D', name: 'arrow-up', size: 14 },
    id: 1,
    sortDir: 'asc_nulls_last',
    sortField: 'date_of_creation',
    title: 'NFT creation date'
  },
  {
    iconRight: { color: '#040B1D', name: 'arrow-down', size: 14 },
    id: 2,
    sortDir: 'desc_nulls_last',
    sortField: 'date_of_creation',
    title: 'NFT creation date'
  },
  {
    iconRight: { color: '#040B1D', name: 'arrow-up', size: 14 },
    id: 3,
    sortDir: 'asc',
    sortField: 'collection_id',
    title: 'Collection id'
  },
  {
    iconRight: { color: '#040B1D', name: 'arrow-down', size: 14 },
    id: 4,
    sortDir: 'desc',
    sortField: 'collection_id',
    title: 'Collection id'
  }
];

const TokensComponent: FC<TokensComponentProps> = ({
  orderBy: defaultOrderBy = { date_of_creation: 'desc_nulls_last' },
  pageSize = 20
}) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  const { collectionId } = useParams<'collectionId'>();
  const [queryParams] = useSearchParams();

  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchString, setSearchString] = useState<string | undefined>('');
  const [select, setSelect] = useState<number>(options[0].id);
  const [view, setView] = useState<ViewType>(ViewType.Grid);

  const selectFilter = useCallback(
    (selected) => {
      const option = options.find((item) => {
        return item.id === selected;
      });

      if (option && option.sortField) {
        setSelect(option.id);
        setOrderBy({ [option.sortField]: option.sortDir });
      }
    },
    [setSelect, setOrderBy]
  );

  const selectGrid = useCallback(
    () => {
      setView(ViewType.Grid);
    },
    [setView]
  );

  const selectList = useCallback(
    () => {
      setView(ViewType.List);
    },
    [setView]
  );

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
      <TopBar>
        <SearchComponent
          onSearchChange={setSearchString}
          placeholder={'NFT / collection'}
        />
        <Controls>
          <Select
            onChange={selectFilter}
            options={options}
            value={select}
          />
          <ViewButtons>
            <ViewButton onClick={selectList}>
              <Icon
                file={view === ViewType.List ? '/static/list_active.svg' : '/static/list.svg'}
                size={32}
              />
            </ViewButton>
            <ViewButton onClick={selectGrid}>
              <Icon
                file={view === ViewType.Grid ? '/static/grid_active.svg' : '/static/grid.svg'}
                size={32}
              />
            </ViewButton>
          </ViewButtons>
        </Controls>
      </TopBar>
      {view === ViewType.List
        ? (
          <Table
            columns={getTokensColumns(currentChain.network, orderBy, setOrderBy)}
            data={tokens || []}
            loading={isTokensFetching}
            rowKey={getRowKey}
          />
        )
        : (
          <div>
            <TokensGrid
              chainNetwork={currentChain.network}
              tokens={tokens || []}
            />
          </div>
        )}

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

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .unique-select .select-wrapper > svg {
    z-index: unset;
  }
  @media (max-width: 767px) {
    margin-bottom: 24px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ViewButtons = styled.div`
  display: flex;
  margin-left: 28px;
`;

const ViewButton = styled.div`
  display: flex;
  cursor: pointer;
  height: 32px;
  margin-top: 4px;
  margin-right: 4px;
  &:last-child {
    margin-right: 0;
  }
`;

export default TokensComponent;
