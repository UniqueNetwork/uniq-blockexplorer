import { Icon, Select } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Token, tokens as gqlTokens, TokenSorting } from '@app/api';
import { Pagination, Table } from '@app/components';
import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';

import { TokensComponentProps } from '../types';
import { DEFAULT_PAGE_SIZE, OPTIONS } from '../constants';
import { getTokensColumns } from './tokensColumnsSchema';
import TokensGrid from './TokensGrid';
import SearchComponent from '@app/components/SearchComponent';

export enum ViewType {
  Grid = 'Grid',
  List = 'List'
}

const filter = ({ accountId, collectionId }: { accountId?: string, collectionId?: string }) => {
  let _filter = {};

  if (accountId) _filter = { owner: { _eq: accountId } };

  if (collectionId) _filter = { ..._filter, collection_id: { _eq: collectionId } };

  return _filter;
};

const TokensComponent: FC<TokensComponentProps> = ({
  orderBy: defaultOrderBy = { date_of_creation: 'desc_nulls_last' },
  pageSize = DEFAULT_PAGE_SIZE
}) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  const { accountId, collectionId } = useParams();

  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchString, setSearchString] = useState<string | undefined>('');
  const [select, setSelect] = useState<number>();
  const [view, setView] = useState<ViewType>(ViewType.Grid);
  const {
    isTokensFetching,
    tokens,
    tokensCount
  } = gqlTokens.useGraphQlTokens({
    filter: filter({ accountId, collectionId }),
    offset: (currentPage - 1) * pageSize,
    orderBy,
    pageSize,
    searchString
  });

  const defaultSortKey: string = Object.keys(defaultOrderBy)?.[0];
  const defaultSortValue: string = Object.values(defaultOrderBy)?.[0];

  const selectFilter = useCallback(
    (selected) => {
      const option = OPTIONS.find((item) => {
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

  const tokenColumns = useMemo(() => {
    return getTokensColumns(currentChain.network, orderBy, setOrderBy);
  }, [currentChain.network, orderBy]);

  const defaultOption = OPTIONS.find((option) => option.sortDir === defaultSortValue && option.sortField === defaultSortKey)?.id ?? '';

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
            defaultValue={defaultOption}
            onChange={selectFilter}
            options={OPTIONS}
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
            columns={tokenColumns}
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

      <Pagination
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
