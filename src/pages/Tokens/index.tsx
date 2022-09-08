import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Tabs } from '@unique-nft/ui-kit';
import { SelectOptionProps } from '@unique-nft/ui-kit/dist/cjs/types';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useApi, useScrollToTop } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { Question } from '@app/images/icons/svgs';
import { TokenSorting } from '@app/api';

import { NFTs } from './NFTs';
import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import PagePaper from '../../components/PagePaper';
import { ViewType } from './components/TokensComponent';

const tabUrls = ['nfts', 'fractional'];

const TokensPage: FC = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentChain } = useApi();
  const [view, setView] = useState<ViewType>(ViewType.Grid);
  const [selectOption, setSelectOption] = useState<SelectOptionProps>();
  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: DEFAULT_PAGE_SIZE,
    title: DEFAULT_PAGE_SIZE.toString(),
  });

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

  const selectFilter = (selected: SelectOptionProps) => {
    const option = OPTIONS.find((item) => {
      return item.id === selected.id;
    });

    if (option && option.sortField) {
      setSelectOption(option);
      setOrderBy({ [option.sortField]: option.sortDir });
    }
  };

  const selectGrid = () => {
    logUserEvents(UserEvents.Click.ON_GRID_VIEW_NFTS);
    setView(ViewType.Grid);
  };

  const selectList = () => {
    logUserEvents(UserEvents.Click.ON_LIST_VIEW_NFTS);
    setView(ViewType.List);
  };

  const handleClick = (tabIndex: number) => {
    navigate(`${basePath}/${tabUrls[tabIndex]}`);
  };

  useEffect(() => {
    if (location.pathname === basePath || location.pathname === `${basePath}/`) {
      navigate(tabUrls[0]);
    }
  }, [basePath, location.pathname, navigate]);

  return (
    <div className="tokens-page">
      <TopBar>
        <Title>NFTs</Title>
      </TopBar>
      <PagePaper>
        <TabsHeader>
          <Tabs
            activeIndex={currentTabIndex}
            disabledIndexes={[1]}
            labels={tabUrls}
            type="slim"
            onClick={handleClick}
          />
          <Tooltip>
            <img data-tip alt="tooltip" data-for="sadFace" src={Question} />
            <ReactTooltip id="sadFace" effect="solid">
              <span>Coming soon</span>
            </ReactTooltip>
          </Tooltip>
          <Tabs activeIndex={currentTabIndex}>
            <RightMenu
              defaultOption={defaultOption}
              selectFilter={selectFilter}
              selectGrid={selectGrid}
              selectList={selectList}
              selectOption={selectOption}
              view={view}
            />
            <></>
          </Tabs>
          <Tabs activeIndex={currentTabIndex}>
            <Outlet />
            <Outlet />
          </Tabs>
        </TabsHeader>
        <Routes>
          <Route
            element={
              <NFTs
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                pageSize={pageSize}
                setPageSize={setPageSize}
                view={view}
              />
            }
            path="nfts"
          />
          <Route element={<div>fractional coming soon</div>} path="fractional" />
        </Routes>
      </PagePaper>
    </div>
  );
};

const Tooltip = styled.div`
  position: absolute;
  top: 16px;
  left: 200px;
`;

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

const TabsHeader = styled.div`
  position: relative;
  margin-bottom: calc(var(--gap) * 1.5);

  .unique-tabs-labels {
    .tab-label {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      text-transform: capitalize;
      height: 28px;
      padding-top: 14px;
      padding-bottom: 30px;

      &.active {
        color: var(--link-color);
      }

      &.disabled {
        cursor: not-allowed;
      }
    }
  }

  .unique-tabs-contents {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export default TokensPage;
