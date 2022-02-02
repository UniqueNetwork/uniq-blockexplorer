import React, { FC, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '@unique-nft/ui-kit';

import Footer from './Footer';
import Header from './Header';

const PageLayout: FC = () => {
  const { pathname } = useLocation();

  const layoutProps = useMemo(() => {
    if (pathname === '/') return { heading: 'Block Explorer' };

    if (/^\/extrinsic\//.test(pathname)) { return { breadcrumbs: { options: [{ link: '/', title: 'Home' }, { title: 'Extrinsic' }] } }; }

    if (/^\/account\//.test(pathname)) { return { breadcrumbs: { options: [{ link: '/', title: 'Home' }, { title: 'Account' }] } }; }
  }, [pathname]);

  return (
    <StyledLayout
      {...layoutProps}
      footer={<Footer />}
      header={<Header />}
    >
      <Outlet />
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  @media (max-width: 1024px) {
    margin-top: 40px;
    
  }

  @media (max-width: 767px) {
    footer {
      margin-top: 40px;
      padding: 16px !important;
      height: 100px !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: flex-start !important;
    }
  }
`;

export default PageLayout;
