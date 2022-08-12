import React, { FC, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

const PageLayout: FC = () => {
  const { pathname } = useLocation();

  const layoutProps = useMemo(() => {
    if (pathname === '/') return { heading: 'Block Explorer' };

    if (/^\/extrinsic\//.test(pathname)) {
      return {
        breadcrumbs: { options: [{ link: '/', title: 'Home' }, { title: 'Extrinsic' }] },
      };
    }

    if (/^\/account\//.test(pathname)) {
      return {
        breadcrumbs: { options: [{ link: '/', title: 'Home' }, { title: 'Account' }] },
      };
    }
  }, [pathname]);

  return (
    <LayoutWrapper>
      <Layout {...layoutProps} footer={<Footer />} header={<Header />}>
        <Outlet />
      </Layout>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  @media (max-width: 991px) {
    header {
      padding: 0 8px;
    }
  }
`;

export default PageLayout;
