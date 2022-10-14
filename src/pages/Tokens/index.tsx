import { FC, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { useApi, useQueryParams, useScrollToTop } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { Question } from '@app/images/icons/svgs';
import { TokenSorting } from '@app/api';
import { RouterTabs, SelectOptionProps } from '@app/components';
import { PageHeading } from '@app/components/PageHeading';

import { NFTs } from './NFTs';
import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import PagePaper from '../../components/PagePaper';
import { ViewType } from './components/TokensComponent';

const tabUrls = ['nfts', 'fractional'];

const TokensPage: FC = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentChain } = useApi();
  const {
    searchString: searchFromQuery,
    accountId,
    nesting,
    sort,
    setParamToQuery,
    view,
  } = useQueryParams();
  // const [view, setView] = useState<ViewType>(ViewType.List);
  const [, selectSort] = useState<SelectOptionProps>();
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

  const selectSorting = (selected: SelectOptionProps) => {
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
    setParamToQuery([{ name: 'view', value: `${ViewType.Grid}` }]);
  };

  const selectList = () => {
    logUserEvents(UserEvents.Click.ON_LIST_VIEW_NFTS);
    setParamToQuery([{ name: 'view', value: `${ViewType.List}` }]);
  };

  useEffect(() => {
    if (location.pathname === basePath || location.pathname === `${basePath}/`) {
      navigate(tabUrls[0]);
    }
  }, [basePath, location.pathname, navigate]);

  return (
    <div className="tokens-page">
      <PageHeading title="Tokens" />
      <PagePaper>
        <RouterTabs
          additionalContent={[
            <>
              {currentTabIndex === 0 && (
                <RightMenu
                  key="top-right-menu"
                  selectSort={selectSorting}
                  selectGrid={selectGrid}
                  selectList={selectList}
                  view={view as ViewType}
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
                view={view as ViewType}
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

export default TokensPage;
