import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Select } from '@unique-nft/ui-kit';
import { useApi } from '../hooks/useApi';
import config from '../config';

const Header: FC<{ className?: string }> = ({ className }) => {
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
    <div className={className}>
      <div className={'nav-container'}>
        <Link to={`/${currentChain ? currentChain?.network + '/' : ''}`}>
          <img
            alt='Logo'
            className='header__logo'
            src='/logos/unique.svg'
          />
        </Link>
        <nav>
          <Link to={`/${currentChain ? currentChain?.network + '/' : ''}collections`}>Collections</Link>
          <Link to={`/${currentChain ? currentChain?.network + '/' : ''}tokens`}>Tokens</Link>
        </nav>
      </div>

      <Select
        onChange={onSelectChange}
        options={Object.values(config.chains).map(({ name, network }) => ({
          id: network,
          title: name
        }))}
        value={currentChain?.network}
      />
    </div>
  );
};

export default styled(Header)`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .nav-container {
    display: flex;
    column-gap: calc(var(--gap) * 2.5);
    nav {
      font-size: 16px;
      display: flex;
      column-gap: var(--gap);
      align-items: center;
    }
  }
`;
