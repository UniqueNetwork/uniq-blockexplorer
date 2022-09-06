import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon, Select, Tabs } from '@unique-nft/ui-kit';
import { SelectOptionProps } from '@unique-nft/ui-kit/dist/cjs/types';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useApi, useScrollToTop, useSearchFromQuery } from '@app/hooks';
import { Search } from '@app/components';
import { OPTIONS } from '@app/pages/Tokens/constants';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { TokenSorting } from '@app/api';

import PagePaper from '../../components/PagePaper';
import TokensComponent, { ViewType } from './components/TokensComponent';
import { DEFAULT_PAGE_SIZE } from './constants';

const defaultOrderBy: TokenSorting = { date_of_creation: 'desc_nulls_last' };
const tabUrls = ['nfts', 'fractional'];

const TokensPage: FC = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentChain } = useApi();
  const searchFromQuery = useSearchFromQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [view, setView] = useState<ViewType>(ViewType.Grid);
  const [selectOption, setSelectOption] = useState<SelectOptionProps>();
  const [searchString, setSearchString] = useState<string | undefined>(searchFromQuery);
  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const defaultSortKey: string = Object.keys(defaultOrderBy)?.[0];
  const defaultSortValue: string = Object.values(defaultOrderBy)?.[0];
  const basePath = `/${currentChain.network}/tokens`;

  const currentTabIndex = tabUrls.findIndex((tab) =>
    location.pathname.includes(`${basePath}/${tab}`),
  );

  const defaultOption =
    OPTIONS.find(
      (option) =>
        option.sortDir === defaultSortValue && option.sortField === defaultSortKey,
    )?.id ?? '';

  const onSearchChange = (value: string) => {
    setSearchString(value);
    setCurrentPage(1);
  };

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

  const handleClick = (tabIndex: number) => {
    navigate(`${basePath}/${tabUrls[tabIndex]}`);
  };

  useEffect(() => {
    if (location.pathname === basePath) {
      navigate(tabUrls[0]);
    }
  }, [basePath, location.pathname, navigate]);

  return (
    <div className="tokens-page">
      <TopBar>
        <Title>NFTs</Title>
        <Search placeholder="NFT / collection" onSearchChange={onSearchChange} />
        <Controls>
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
      <PagePaper>
        <div className="tabs-header">
          <Tabs
            activeIndex={currentTabIndex}
            labels={['NFTs', 'Coins']}
            type="slim"
            onClick={handleClick}
          />
          <Tabs activeIndex={currentTabIndex}>
            <Select
              defaultValue={defaultOption}
              options={OPTIONS}
              value={selectOption?.id as string}
              onChange={selectFilter}
            />
            <></>
          </Tabs>
        </div>
        <Tabs activeIndex={currentTabIndex}>
          <Outlet />
          <Outlet />
        </Tabs>
        <TokensComponent
          currentPage={currentPage}
          orderBy={orderBy}
          pageSize={DEFAULT_PAGE_SIZE}
          searchString={searchString}
          setCurrentPage={setCurrentPage}
          setSearchString={setSearchString}
          setOrderBy={setOrderBy}
          view={view}
        />
      </PagePaper>
    </div>
  );
};

const TopBar = styled.div`
  display: grid;
  grid-column-gap: calc(var(--gap) * 2);
  grid-template-columns: 1fr 560px 72px;
  margin-bottom: calc(var(--gap) * 2.5);

  .unique-select .select-wrapper > svg {
    z-index: unset;
  }

  @media (max-width: 767px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
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
  grid-column-gap: calc(var(--gap) / 2);
`;

const ViewButton = styled.div`
  display: flex;
  cursor: pointer;
  height: 32px;
`;

export default TokensPage;
