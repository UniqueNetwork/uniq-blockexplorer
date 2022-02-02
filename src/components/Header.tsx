import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Select } from '@unique-nft/ui-kit';
import { useApi } from '../hooks/useApi';
import config from '../config';

const Header: FC = () => {
  const { currentChain } = useApi();

  const navigate = useNavigate();

  const onSelectChange = useCallback(
    (value?: string) => {
      if (value) {
        navigate(`${value}/`);
      }
    },
    [navigate]
  );

  return (
    <HeaderWrapper>
      <HeaderNavWrapper>
        <Link to={`/${currentChain ? currentChain?.network + '/' : ''}`}>
          <img
            alt='Logo'
            src='/logos/unique.svg'
          />
        </Link>
        <HeaderNav>
          <NavLink to={`/${currentChain ? currentChain?.network + '/' : ''}collections`}>Collections</NavLink>
          <NavLink to={`/${currentChain ? currentChain?.network + '/' : ''}tokens`}>Tokens</NavLink>
        </HeaderNav>
      </HeaderNavWrapper>

      <Select
        onChange={onSelectChange}
        options={Object.values(config.chains).map(({ name, network }) => ({
          id: network,
          title: name
        }))}
        value={currentChain?.network}
      />
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
`;

const HeaderNav = styled.nav`
  font-size: 16px;
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  .active {
    color: var(--black-color);
    cursor: default;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default Header;
