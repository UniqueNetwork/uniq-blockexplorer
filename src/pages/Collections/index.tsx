import { FC, useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components/macro';

import { useApi, useQueryParams, useScrollToTop } from '@app/hooks';
import { logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { TokenSorting, TokenTypeEnum } from '@app/api';
import { RouterTabs, SelectOptionProps, ViewType } from '@app/components';
import { PageHeading } from '@app/components/PageHeading';

import { RightMenu } from './components/RightMenu';
import { DEFAULT_PAGE_SIZE, defaultOrderBy, OPTIONS } from './constants';
import PagePaper from '../../components/PagePaper';
import CollectionsComponent from './components/CollectionsComponent';

const tabUrls = ['nfts', 'fractional'];

const CollectionsPage: FC = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentChain } = useApi();
  const { setParamToQuery, view, nesting } = useQueryParams();
  const [, selectSort] = useState<SelectOptionProps>();
  const [queryParams, setQueryParams] = useSearchParams();
  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);

  const setNestingAndQuery = () => {
    // setCurrentPage(1);
    setParamToQuery([{ name: 'nesting', value: nesting === 'true' ? 'false' : 'true' }]);
  };

  const setOrderAndQuery = (sorting: TokenSorting) => {
    if (!Object.values(sorting)[0]) {
      sorting = defaultOrderBy;
    }

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

  const basePath = `/${currentChain.network.toLowerCase()}/collections`;

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
    <CollectionsPageWrapper className="tokens-page">
      <PageHeading title="Collections" />
      <PagePaper>
        <RouterTabs
          additionalContent={[
            <RightMenu
              key="top-right-menu"
              selectSort={selectSorting}
              selectGrid={selectGrid}
              selectList={selectList}
              view={view as ViewType}
              nestingOn={nesting === 'true'}
              setNestingOn={setNestingAndQuery}
            />,
          ]}
          basePath={basePath}
          content={[
            <div className="flex-column" key="nft-tab">
              NFTs
            </div>,
            <div className="flex-row" key="fractional-tab">
              Fractional
            </div>,
          ]}
          tabUrls={tabUrls}
          queryParams={queryParams.toString()}
        />
        <Routes>
          <Route
            element={
              <CollectionsComponent
                orderBy={orderBy}
                setOrderBy={setOrderAndQuery}
                pageSize={pageSize}
                setPageSize={setPageSize}
                view={view as ViewType}
                type={TokenTypeEnum.NFT}
              />
            }
            path="nfts"
          />
          <Route
            element={
              <CollectionsComponent
                orderBy={orderBy}
                setOrderBy={setOrderAndQuery}
                pageSize={pageSize}
                setPageSize={setPageSize}
                view={view as ViewType}
                type={TokenTypeEnum.RFT}
              />
            }
            path="fractional"
          />
        </Routes>
      </PagePaper>
    </CollectionsPageWrapper>
  );
};

const CollectionsPageWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  th.rc-table-cell > svg[class^='ArrowDownUp'] {
    @media (max-width: 991px) {
      display: none;
    }
  }
`;

export default CollectionsPage;
