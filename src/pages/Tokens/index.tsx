import { FC, useContext, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { UserEvents } from '@app/analytics/user_analytics';
import { TokenSorting } from '@app/api';
import { RouterTabs, SelectOptionProps, ViewType } from '@app/components';
import { DeviceSizes, useApi, useScrollToTop } from '@app/hooks';
import { Question } from '@app/images/icons/svgs';
import MenuContext from '@app/toolbarContext/toolbarContext';
import { logUserEvents } from '@app/utils';

import PagePaper from '../../components/PagePaper';
import { RightMenu } from './components/RightMenu';
import { defaultOrderBy, DEFAULT_PAGE_SIZE, OPTIONS } from './constants';
import { NFTs } from './NFTs';

const tabUrls = ['nfts', 'fractional'];

const TokensPage: FC = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentChain } = useApi();
  const { view, setView, sort, selectSort } = useContext(MenuContext);
  const [queryParams, setQueryParams] = useSearchParams();
  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);

  const setOrderAndQuery = (sorting: TokenSorting) => {
    setOrderBy(sorting);
    queryParams.set(
      'sort',
      // @ts-ignore
      `${Object.keys(sorting)[0]}-${sorting[Object.keys(sorting)[0]]}`,
    );
    setQueryParams(queryParams);
  };

  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: DEFAULT_PAGE_SIZE,
    title: DEFAULT_PAGE_SIZE.toString(),
  });

  // get sort from query string
  useEffect(() => {
    if (queryParams.get('sort')) {
      const split = queryParams.get('sort')?.split('-');
      const orderBy = split ? { [split[0]]: split[1] } : ({} as TokenSorting);
      setOrderBy(orderBy);
    }
  }, [queryParams]);

  const basePath = `/${currentChain.network.toLowerCase()}/tokens`;

  const currentTabIndex = tabUrls.findIndex((tab) =>
    location.pathname.includes(`${basePath}/${tab}`),
  );

  const selectFilter = (selected: SelectOptionProps) => {
    const option = OPTIONS.find((item) => {
      return item.id === selected.id;
    });

    if (option && option.sortField) {
      selectSort(option);
      setOrderBy({ [option.sortField]: option.sortDir });
      queryParams.set('sort', `${option.sortField}-${option.sortDir}`);
      setQueryParams(queryParams);
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
                  key="top-right-menu"
                  selectSort={selectFilter}
                  selectGrid={selectGrid}
                  selectList={selectList}
                  view={view}
                />
              )}
            </>,
          ]}
          basePath={basePath}
          content={[
            <div className="flex-column">NFTs</div>,
            <div className="flex-row">
              Fractional
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
                setOrderBy={setOrderAndQuery}
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
