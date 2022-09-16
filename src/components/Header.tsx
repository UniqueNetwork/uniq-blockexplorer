import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import {
  DeviceSize,
  DeviceSizes,
  useApi,
  useDeviceSize,
  useSearchFromQuery,
} from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { Select, SelectOptionProps } from '@app/components';
import { capitalizeFirstLetter } from '@app/components/utils';
import { IconType } from '@app/images/icons';
import SearchComponent from '@app/components/SearchComponent';

import config from '../config';
import MobileMenu from './MobileMenu';
import { Menu } from './Menu';

const Header: FC = () => {
  const { currentChain } = useApi();
  const deviceSize = useDeviceSize();
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();
  const isDesktop = deviceSize > DeviceSize.md;
  const { setSearchString } = useSearchFromQuery();
  const isNotMainPage =
    location.pathname !== `/${currentChain.network}/` &&
    location.pathname !== `/${currentChain.network}`;
  const canShowSearch = isDesktop && isNotMainPage;

  const onLogoClick = useCallback(() => {
    queryParams.delete('search');
    setQueryParams(queryParams);

    if (!isNotMainPage) {
      window.location.reload();
    }
  }, [isNotMainPage, queryParams, setQueryParams]);

  const onSelectChange = useCallback(
    (option: SelectOptionProps) => {
      if (option) {
        // user analytics
        const path = window.location.pathname;

        if (path.includes('tokens')) {
          logUserEvents(UserEvents.Click.CHOOSE_A_NETWORK_BUTTON_FROM_NFTS_PAGE);
        } else if (path.includes('collections')) {
          logUserEvents(UserEvents.Click.CHOOSE_A_NETWORK_BUTTON_FROM_COLLECTIONS_PAGE);
        } else {
          logUserEvents(UserEvents.Click.CHOOSE_A_NETWORK_BUTTON_FROM_MAIN_PAGE);
        }

        navigate(`${option.id as string}/`);
        window.location.reload();
      }
    },
    [navigate],
  );

  return (
    <>
      <HeaderWrapper canShowSearch={canShowSearch} data-automation-id="header">
        <HeaderNavWrapper>
          <Link
            to={`/${currentChain ? currentChain?.network + '/' : ''}`}
            onClick={onLogoClick}
          >
            <Logo alt="Logo" src="/logos/logo_product.svg" />
          </Link>
          <HeaderNav data-automation-id="desktop-menu">
            <Menu />
          </HeaderNav>
        </HeaderNavWrapper>
        {canShowSearch && (
          <SearchComponent placeholder="Global search" onSearchChange={setSearchString} />
        )}
        <ChainsSelectWrapper>
          <ChainsSelect
            options={Object.values(config.chains).map(({ network, name }) => ({
              iconLeft: {
                name: `chain${capitalizeFirstLetter(network)}` as IconType,
                height: 16,
                width: 16,
              },
              id: network,
              title: network === 'UNIQUE' ? name : capitalizeFirstLetter(network),
            }))}
            value={currentChain?.network}
            onChange={onSelectChange}
          />
        </ChainsSelectWrapper>
      </HeaderWrapper>
      <MobileMenu />
    </>
  );
};

const HeaderWrapper = styled.div.attrs<{ canShowSearch?: boolean }>((props) => ({
  canShowSearch: props.canShowSearch,
}))<{ canShowSearch?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.canShowSearch ? '1fr 676px 180px' : '1fr 180px'};
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .global-search {
    .unique-input-text {
      width: 100%;
    }
  }

  @media (max-width: ${DeviceSizes.xl}) {
    grid-template-columns: ${(props) =>
      props.canShowSearch ? '1fr 302px 180px' : '1fr 180px'};
  }
`;

const HeaderNavWrapper = styled.div`
  display: flex;
  column-gap: calc(var(--gap) * 2.5);
  align-items: center;

  @media (max-width: ${DeviceSizes.sm}) {
    column-gap: calc(var(--gap));
  }
`;

const HeaderNav = styled.nav`
  font-size: 16px;
  display: flex;
  column-gap: calc(var(--gap) * 1.5);
  align-items: center;

  a {
    color: var(--primary-500);
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    span {
      color: var(--primary-500);
    }

    &:hover {
      text-decoration: none;
      color: var(--primary-500);
    }

    &.active {
      color: var(--dark);
      cursor: default;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }

      span {
        color: var(--dark);
      }
    }
  }

  @media (max-width: ${DeviceSizes.lg}) {
    display: none;
  }
`;

const Logo = styled.img`
  @media (max-width: 568px) {
    width: 105px;
  }
`;

const ChainsSelectWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
`;

const ChainsSelect = styled(Select)`
  .select-wrapper {
    .icon-triangle {
      z-index: auto;
    }

    .select-value {
      border-radius: 8px;

      > {
        display: none;
      }
    }

    .select-dropdown {
      top: 54px;
      border-radius: 8px;
    }
  }

  @media (max-width: 450px) {
    width: auto;
    position: static;

    .select-wrapper {
      position: static;
      display: flex;
      .select-value {
        font-size: 0;
        width: 50px;
        svg,
        img {
          margin-right: 0 !important;
        }
      }
      .icon-triangle {
        top: auto;
        right: 18px;
      }
      .select-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        border: 0;
        border-radius: 0;
        height: calc(100vh - 80px);
        background-color: var(--white-color);
        padding: calc(var(--gap) * 1.5) var(--gap);
        box-shadow: 0px -6px 8px -8px rgb(0 0 0 / 14%) inset,
          0px 6px 8px -8px rgb(0 0 0 / 14%) inset;
      }
    }
  }
`;

export default Header;
