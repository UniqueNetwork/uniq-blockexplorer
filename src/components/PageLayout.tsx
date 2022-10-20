import React, { FC, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { deviceWidth } from '@app/hooks/useDeviceSize';

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
  .unique-layout header,
  .unique-layout footer {
    padding-left: 32px;
    padding-right: 32px;

    @media ${deviceWidth.smallerThan.lg} {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }

    >div: first-of-type {
      margin-left: auto;
      margin-right: auto;
      max-width: 1616px;
    }
  }

  .unique-layout main {
    margin-left: 32px;
    margin-right: 32px;

    @media ${deviceWidth.smallerThan.lg} {
      margin-left: 8px;
      margin-right: 8px;
      margin-bottom: var(--gap);
    }
    >div: first-of-type {
      margin-left: auto;
      margin-right: auto;
      max-width: 1616px;
      width: 100%;
    }
  }
  @media (max-width: 991px) {
    header {
      padding: 0 8px;
    }
  }
`;

export default PageLayout;
