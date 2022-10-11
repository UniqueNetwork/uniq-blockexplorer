import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';

import { DeviceSizes } from '@app/hooks';

import MobileMenuIcon from './MobileMenuIcon';
import { Menu } from './Menu';

const MobileMenu: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const currentLocation = useRef<string>();

  const onMenuClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  useEffect(() => {
    if (currentLocation.current && currentLocation.current !== location.pathname) {
      setIsOpen(false);
    }

    currentLocation.current = location.pathname;
  }, [location, setIsOpen]);

  return (
    <MobileMenuWrapper data-automation-id="mobile-menu">
      <MobileMenuIcon isOpen={isOpen} onClick={onMenuClick} />
      {isOpen && (
        <MobileMenuNav>
          <Menu />
        </MobileMenuNav>
      )}
    </MobileMenuWrapper>
  );
};

const MobileMenuWrapper = styled.div`
  display: none;

  @media (max-width: ${DeviceSizes.lg}) {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }
`;

const MobileMenuNav = styled.nav`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 9;
  height: calc(100vh - 80px);
  background-color: var(--white-color);
  padding: calc(var(--gap) * 1.5) var(--gap);
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--gap) * 1.5);
  box-shadow: 0px -6px 8px -8px rgb(0 0 0 / 14%) inset,
    0px 6px 8px -8px rgb(0 0 0 / 14%) inset;
  a {
    font-size: 16px;
    line-height: 24px;
    color: var(--dark);
    font-weight: 500;
    &:hover {
      text-decoration: none;
    }
  }
  .active {
    color: var(--primary-500);
    cursor: default;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
    span {
      color: var(--primary-500);
    }
  }
`;

export default MobileMenu;
