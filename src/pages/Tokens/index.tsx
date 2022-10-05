import { FC, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { RouterTabs, SelectOptionProps } from '@app/components';
import { PageHeading } from '@app/components/PageHeading';
import { useApi, useScrollToTop } from '@app/hooks';
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
      <PageHeading title="Tokens" />
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

export default TokensPage;
