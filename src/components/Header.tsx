import React, { FC, useCallback } from 'react';
import { Select } from '@unique-nft/ui-kit';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className={'flexbox-container flexbox-container_space-between full-width'}>
      <Link to={`/${currentChain ? currentChain?.network + '/' : ''}`}>
        <img
          alt='Logo'
          className='header__logo'
          src='/logos/unique.svg'
        />
      </Link>
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

export default Header;
