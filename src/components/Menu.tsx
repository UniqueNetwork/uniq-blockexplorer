import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useApi } from '../hooks/useApi';
import { logUserEvents } from '@app/utils/logUserEvents';

const Menu: FC = () => {
  const { currentChain } = useApi();

  // user analytics
  const onMenuClick = (bullit: string) => () => {
    const path = window.location.pathname;

    const getCurrentPage = () => {
      if (path.includes('tokens')) {
        return 'NFTS';
      } else if (path.includes('collections')) {
        return 'COLLECTIONS';
      } else {
        return 'MAIN';
      }
    };

    const currentPage = getCurrentPage();

    logUserEvents(`CLICK_${bullit}_MENU_BUTTON_FROM_${currentPage}_PAGE`);
  };

  return (
    <>
      <NavLink
        onClick={ onMenuClick('COLLECTIONS')}
        to={`/${currentChain ? currentChain?.network + '/' : ''}collections`}
      >Collections</NavLink>
      <NavLink
        onClick={ onMenuClick('NFTS')}
        to={`/${currentChain ? currentChain?.network + '/' : ''}tokens`}
      >NFTs</NavLink>
    </>
  );
};

export default Menu;
