import { Icon, Select } from '@unique-nft/ui-kit';
import { SelectOptionProps } from '@unique-nft/ui-kit/dist/cjs/types';
import { DefaultRecordType } from 'rc-table/lib/interface';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { Token, TokenSorting, useGraphQlTokens } from '@app/api';
import { Pagination, Search, ScrollableTable } from '@app/components';
import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

import { TokensComponentProps } from '../types';
import { DEFAULT_PAGE_SIZE, OPTIONS } from '../constants';
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
  orderBy: defaultOrderBy = { date_of_creation: 'desc_nulls_last' },
  pageSize = DEFAULT_PAGE_SIZE,
}) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  const [queryParams, setQueryParams] = useSearchParams();
  const searchString = queryParams.get('search') || '';
  const { accountId, collectionId } = useParams();

  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectOption, setSelectOption] = useState<SelectOptionProps>();
  const [view, setView] = useState<ViewType>(ViewType.Grid);
  const { isTokensFetching, timestamp, tokens, tokensCount } = useGraphQlTokens({
    filter: filter({ accountId, collectionId }),
    offset: (currentPage - 1) * pageSize,
    orderBy,
    pageSize,
    searchString,
  });

  const defaultSortKey: string = Object.keys(defaultOrderBy)?.[0];
  const defaultSortValue: string = Object.values(defaultOrderBy)?.[0];

  const selectFilter = useCallback(
    (selected) => {
      const option = OPTIONS.find((item) => {
        return item.id === selected.id;
      });

      if (option && option.sortField) {
        setSelectOption(option);
        setOrderBy({ [option.sortField]: option.sortDir });
      }
    },
    [setSelectOption, setOrderBy],
  );

  const selectGrid = useCallback(() => {
    logUserEvents(UserEvents.Click.ON_GRID_VIEW_NFTS);
    setView(ViewType.Grid);
  }, [setView]);

  const selectList = useCallback(() => {
    logUserEvents(UserEvents.Click.ON_LIST_VIEW_NFTS);
    setView(ViewType.List);
  }, [setView]);

  const onSearchChange = (value: string) => {
    if (!value) {
      queryParams.delete('search');
    } else {
      queryParams.set('search', value);
    }

    setQueryParams(queryParams);
  };

  const tokenColumns = useMemo(() => {
    return getTokensColumns(currentChain.network, orderBy, setOrderBy);
  }, [currentChain.network, orderBy]);

  const defaultOption =
    OPTIONS.find(
      (option) =>
        option.sortDir === defaultSortValue && option.sortField === defaultSortKey,
    )?.id ?? '';

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `token-${(item as Token).collection_id}-${(item as Token).token_id}`,
    [],
  );

  return (
    <>
      <TopBar>
        <Search placeholder="NFT / collection" onSearchChange={onSearchChange} />
        <Controls>
          {view === ViewType.Grid && (
            <Select
              defaultValue={defaultOption}
              options={OPTIONS}
              value={selectOption?.id as string}
              onChange={selectFilter}
            />
          )}
          <ViewButtons>
            <ViewButton onClick={selectList}>
              <Icon
                file={
                  view === ViewType.List ? '/static/list_active.svg' : '/static/list.svg'
                }
                size={32}
              />
            </ViewButton>
            <ViewButton onClick={selectGrid}>
              <Icon
                file={
                  view === ViewType.Grid ? '/static/grid_active.svg' : '/static/grid.svg'
                }
                size={32}
              />
            </ViewButton>
          </ViewButtons>
        </Controls>
      </TopBar>
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

      <Pagination
        count={tokensCount || 0}
        currentPage={currentPage}
        pageSize={pageSize}
        siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: calc(var(--gap) * 3);
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
