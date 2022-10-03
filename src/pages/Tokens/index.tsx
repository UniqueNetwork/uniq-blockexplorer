import { FC, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { RouterTabs, SelectOptionProps } from '@app/components';
import { DeviceSizes, useApi, useScrollToTop } from '@app/hooks';
import { Question } from '@app/images/icons/svgs';

import PagePaper from '../../components/PagePaper';
import { RightMenu } from './components/RightMenu';
import TokensComponent from './components/TokensComponent';
import { DEFAULT_PAGE_SIZE } from './constants';

const tabUrls = ['nfts', 'fractional'];

const TokensPage: FC = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentChain } = useApi();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: DEFAULT_PAGE_SIZE,
    title: DEFAULT_PAGE_SIZE.toString(),
  });

  const basePath = `/${currentChain.network.toLowerCase()}/tokens`;

  const currentTabIndex = tabUrls.findIndex((tab) =>
    location.pathname.includes(`${basePath}/${tab}`),
  );

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
          additionalContent={currentTabIndex === 0 && <RightMenu key="top-right-menu" />}
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
              <TokensComponent
                currentPage={currentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
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
