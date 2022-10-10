import { FC, useCallback } from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { DeviceSizes, useApi, useLocationPathname } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { GlobalSearch, Select, SelectOptionProps } from '@app/components';
import { capitalizeFirstLetter } from '@app/components/utils';
import { IconType } from '@app/images/icons';

import config from '../config';
import MobileMenu from './MobileMenu';
import { Menu } from './Menu';

const Header: FC = () => {
  const { currentChain } = useApi();
  const { notTheMainPage } = useLocationPathname();

  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();

  const onLogoClick = useCallback(() => {
    const onTheMainPage =
      window.location.pathname === `/${currentChain?.network.toLowerCase()}/`;
    queryParams.delete('search');
    setQueryParams(queryParams);

    if (onTheMainPage) {
      window.location.reload();
    }
  }, [currentChain?.network, queryParams, setQueryParams]);

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

        navigate(`${(option.id as string).toLowerCase()}/`);
        window.location.reload();
      }
    },
    [navigate],
  );

  return (
    <>
      <HeaderWrapper data-automation-id="header">
        <LeftSide>
          <HeaderNavWrapper>
            <Link
              to={`/${currentChain ? currentChain?.network.toLowerCase() + '/' : ''}`}
              onClick={onLogoClick}
            >
              <Logo alt="Logo" src="/logos/logo_product.svg" />
            </Link>
            <HeaderNav data-automation-id="desktop-menu">
              <Menu />
            </HeaderNav>
          </HeaderNavWrapper>
        </LeftSide>
        <RightSide>
          {notTheMainPage && (
            <SearchWrapper>
              <GlobalSearch />
            </SearchWrapper>
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
          <MobileMenu />
        </RightSide>
      </HeaderWrapper>
    </>
  );
};

const LeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const SearchWrapper = styled.div`
  flex-grow: 1;
  max-width: 614px;
  margin-right: 40px;
  > div > div {
    width: auto;
    flex-grow: 1;
    margin-right: 0;
  }
  @media (max-width: ${DeviceSizes.md}) {
    display: none;
  }
`;

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
  height: 40px;
`;

const ChainsSelect = styled(Select)`
  width: auto;

  .select-wrapper {
    width: auto;
    position: static;
    display: flex;
    border-radius: calc(var(--gap) / 2);

    .select-value {
      width: 32px;
      font-size: 0;
      margin-right: 0;
      border-radius: calc(var(--gap) / 2);
      svg,
      img {
        margin-right: 0 !important;
      }
    }
    .icon-triangle {
      top: auto;
    }
    .select-dropdown {
      position: absolute;
      width: 160px;
      height: auto;
      right: 0;
      left: auto;
      border-radius: var(--prop-border-radius);
      background-color: var(--white-color);
      padding: calc(var(--gap) * 1.5) var(--gap);
      box-shadow: 0px -6px 8px -8px rgb(0 0 0 / 14%) inset,
        0px 6px 8px -8px rgb(0 0 0 / 14%) inset;
    }
  }
`;

export default Header;
