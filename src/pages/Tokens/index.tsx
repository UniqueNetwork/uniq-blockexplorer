import { FC, useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components/macro';
import ReactTooltip from 'react-tooltip';
import { Text } from '@unique-nft/ui-kit';

import { useApi, useLocationPathname, useQueryParams, useScrollToTop } from '@app/hooks';
import { isTouchEnabled, logUserEvents } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { TokenSorting } from '@app/api';
import { RouterTabs, SelectOptionProps, SVGIcon, ViewType } from '@app/components';
import { PageHeading } from '@app/components/PageHeading';

import { NFTs } from './NFTs';
import { RightMenu } from './components/RightMenu';
import {
  DEFAULT_PAGE_SIZE,
  defaultOrderBy,
  FRACTIONAL_SORTING_OPTIONS,
  OPTIONS,
} from './constants';
import PagePaper from '../../components/PagePaper';
import { RFTs } from './RFTs';

const tabUrls = ['nfts', 'fractional'];

const TokensPage: FC = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentChain } = useApi();
  const { setParamToQuery, view } = useQueryParams();
  const [, selectSort] = useState<SelectOptionProps>();
  const [queryParams, setQueryParams] = useSearchParams();
  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const { fractionalPage } = useLocationPathname();

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

  const basePath = `/${currentChain.network.toLowerCase()}/tokens`;

  const currentTabIndex = tabUrls.findIndex((tab) =>
    location.pathname.includes(`${basePath}/${tab}`),
  );

  const selectSorting = (selected: SelectOptionProps) => {
    const sortingOptions = fractionalPage
      ? [...OPTIONS, ...FRACTIONAL_SORTING_OPTIONS]
      : OPTIONS;
    const option = sortingOptions.find((item) => {
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
    <TokensPageWrapper className="tokens-page">
      <PageHeading title="Tokens" />
      <PagePaper>
        <RouterTabs
          additionalContent={[
            <RightMenu
              key="top-right-menu"
              selectSort={selectSorting}
              selectGrid={selectGrid}
              selectList={selectList}
              view={view as ViewType}
            />,
          ]}
          basePath={basePath}
          content={[
            <div className="flex-column" key="nft-tab">
              NFTs
            </div>,
            <div className="flex-row" key="fractional-tab">
              Fractional
              <SVGIconStyled
                data-tip
                data-for="fractional-question"
                name="question"
                height={24}
                width={24}
              />
              <ReactTooltip
                event={isTouchEnabled() ? 'click' : undefined}
                id="fractional-question"
                effect="solid"
                eventOff="mouseleave"
                place={'right'}
              >
                <TextStyled color={'additional-light'} weight={'light'}>
                  A&nbsp;fractional token provides a&nbsp;way for many users to&nbsp;own
                  a&nbsp;part of&nbsp;an&nbsp;NFT
                </TextStyled>
              </ReactTooltip>
            </div>,
          ]}
          tabUrls={tabUrls}
          queryParams={queryParams.toString()}
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
          <Route
            element={
              <RFTs
                orderBy={orderBy}
                setOrderBy={setOrderAndQuery}
                pageSize={pageSize}
                setPageSize={setPageSize}
                view={view as ViewType}
              />
            }
            path="fractional"
          />
        </Routes>
      </PagePaper>
    </TokensPageWrapper>
  );
};

const TokensPageWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  th.rc-table-cell > svg[class^='ArrowDownUp'] {
    @media (max-width: 991px) {
      display: none;
    }
  }
`;

const SVGIconStyled = styled(SVGIcon)`
  margin-left: 4px;
`;

const TextStyled = styled(Text)`
  text-transform: none;
`;

export default TokensPage;
