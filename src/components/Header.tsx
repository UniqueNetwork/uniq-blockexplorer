import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Select } from '@unique-nft/ui-kit';
import { SelectOptionProps } from '@unique-nft/ui-kit/dist/cjs/types';
import { useApi } from '@app/hooks';

import config from '../config';
import MobileMenu from './MobileMenu';
import Menu from './Menu';
import LoadingComponent from './LoadingComponent';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

const Header: FC = () => {
  const { currentChain } = useApi();

  const navigate = useNavigate();

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
        location.reload();
      }
    },
    [navigate]
  );

  return (
    <HeaderWrapper>
      <HeaderNavWrapper>
        <MobileMenu />
        <Link to={`/${currentChain ? currentChain?.network + '/' : ''}`}>
          <Logo
            alt='Logo'
            src='/logos/unique.svg'
          />
        </Link>
        <HeaderNav>
          <Menu />
        </HeaderNav>
      </HeaderNavWrapper>
      <ChainsSelectWrapper>
        <ChainsSelect
          onChange={onSelectChange}
          options={Object.values(config.chains).map(({ name, network }) => ({
            iconLeft: {
              name: `chain-${network.toLowerCase()}`,
              size: 16
            },
            id: network,
            title: name
          }))}
          value={currentChain?.network}
        />
      </ChainsSelectWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const HeaderNavWrapper = styled.div`
  display: flex;
  column-gap: calc(var(--gap) * 2.5);
  align-items: center;
  @media (max-width: 767px) {
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
  }
  .active {
    color: var(--dark);
    cursor: default;
    text-decoration: underline;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 1024px) {
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

const ChainsSelectLoader = styled(LoadingComponent)`
  width: 32px;
  position: relative;
`;

const ChainsSelect = styled(Select)`
  .select-wrapper {
    .icon-triangle {
      z-index: auto;
      margin: 21px;
    }
    .select-value {
      border-radius: 8px;
      padding: var(--gap);
    }
    .select-dropdown {
      top: 54px;
      border-radius: 8px;
    }
  }
  
  @media (max-width: 568px) {
    width: auto;
    position: static;
    
    .select-wrapper {
      position: static;
      display: flex;
      .select-value {
        font-size: 0;
        width: 50px;
        svg, img {
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
        box-shadow: 0px -6px 8px -8px rgb(0 0 0 / 14%) inset, 0px 6px 8px -8px rgb(0 0 0 / 14%) inset;
      }
    }
  }
`;

export default Header;
