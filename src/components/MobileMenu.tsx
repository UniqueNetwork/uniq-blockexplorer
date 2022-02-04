import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import MobileMenuIcon from './MobileMenuIcon';
import Menu from './Menu';

const MobileMenu: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const currentLocation = useRef<string>();

  const onMenuClick = useCallback(
    () => {
      setIsOpen(!isOpen);
    },
    [setIsOpen, isOpen]
  );

  useEffect(() => {
    if (currentLocation.current && currentLocation.current !== location.pathname) {
      setIsOpen(false);
    }

    currentLocation.current = location.pathname;
  }, [location, setIsOpen]);

  return (<MobileMenuWrapper>
    <MobileMenuIcon
      isOpen={isOpen}
      onClick={onMenuClick}
    />
    {isOpen && <MobileMenuNav><Menu /></MobileMenuNav>}
  </MobileMenuWrapper>);
};

const MobileMenuWrapper = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenuNav = styled.nav`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100vh - 80px);
  background-color: var(--white-color);
  padding: calc(var(--gap) * 1.5) var(--gap);
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--gap) * 1.5);
  box-shadow: 0px -6px 8px -8px rgb(0 0 0 / 14%) inset, 0px 6px 8px -8px rgb(0 0 0 / 14%) inset;
  a {
    font-size: 16px;
    line-height: 24px;
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
`;

export default MobileMenu;
