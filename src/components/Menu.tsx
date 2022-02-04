import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useApi } from '../hooks/useApi';

const Menu: FC = () => {
  const { currentChain } = useApi();

  return (
    <>
      <NavLink to={`/${currentChain ? currentChain?.network + '/' : ''}collections`}>Collections</NavLink>
      <NavLink to={`/${currentChain ? currentChain?.network + '/' : ''}tokens`}>NFTs</NavLink>
    </>
  );
};

export default Menu;
