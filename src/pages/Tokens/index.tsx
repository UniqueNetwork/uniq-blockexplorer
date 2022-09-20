import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { DeviceSizes, useApi, useScrollToTop } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { Question } from '@app/images/icons/svgs';
import { TokenSorting } from '@app/api';
import { RouterTabs, SelectOptionProps, ViewType } from '@app/components';

import { NFTs } from './NFTs';
import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import PagePaper from '../../components/PagePaper';

const tabUrls = ['nfts', 'fractional'];

const TokensPage: FC = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentChain } = useApi();
  const [view, setView] = useState<ViewType>(ViewType.Grid);
  const [sort, selectSort] = useState<SelectOptionProps>();
  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: DEFAULT_PAGE_SIZE,
    title: DEFAULT_PAGE_SIZE.toString(),
  });

  const defaultSortKey: string = Object.keys(defaultOrderBy)?.[0];
  const defaultSortValue: string = Object.values(defaultOrderBy)?.[0];
  const basePath = `/${currentChain.network.toLowerCase()}/tokens`;

  const currentTabIndex = tabUrls.findIndex((tab) =>
    location.pathname.includes(`${basePath}/${tab}`),
  );

  const defaultSort =
    OPTIONS.find((option) =>
      sort
        ? option.sortDir === sort.sortDir
        : option.sortDir === defaultSortValue && option.sortField === defaultSortKey,
    )?.id ?? '';

  const selectFilter = (selected: SelectOptionProps) => {
    const option = OPTIONS.find((item) => {
      return item.id === selected.id;
    });

    if (option && option.sortField) {
      selectSort(option);
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

  useEffect(() => {
    if (location.pathname === basePath || location.pathname === `${basePath}/`) {
      navigate(tabUrls[0]);
    }
  }, [basePath, location.pathname, navigate]);

  return (
    <div className="tokens-page">
      <TopBar>
        <Title>Tokens</Title>
      </TopBar>
      <PagePaper>
        <RouterTabs
          additionalContent={[
            <>
              {currentTabIndex === 0 && (
                <RightMenu
                  defaultSort={defaultSort}
                  key="top-right-menu"
                  selectSort={selectFilter}
                  selectGrid={selectGrid}
                  selectList={selectList}
                  sort={sort}
                  view={view}
                />
              )}
            </>,
          ]}
          basePath={basePath}
          content={[
            <div className="flex-column">{tabUrls[0]}</div>,
            <div className="flex-row">
              {tabUrls[1]}
              <img data-tip alt="tooltip" data-for="sadFace" src={Question} />
              <ReactTooltip id="sadFace" effect="solid">
                <span>Coming soon</span>
              </ReactTooltip>
            </div>,
          ]}
          tabsClassNames={['', 'disabled']}
          tabUrls={tabUrls}
        />
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

const TopBar = styled.div`
  display: grid;
  grid-column-gap: calc(var(--gap) * 2);
  grid-template-columns: 1fr 560px 72px;
  margin-bottom: calc(var(--gap) * 2.5);

  .unique-select .select-wrapper > svg {
    z-index: unset;
  }

  @media (max-width: ${DeviceSizes.sm}) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
`;

export default TokensPage;
