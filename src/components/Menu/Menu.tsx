import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { logUserEvents } from '@app/utils/logUserEvents';
import { useApi } from '@app/hooks';

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
      }

      return 'MAIN';
    };

    const currentPage = getCurrentPage();

    logUserEvents(`CLICK_${bullit}_MENU_BUTTON_FROM_${currentPage}_PAGE`);
  };

  return (
    <>
      <NavLink
        to={`/${currentChain ? currentChain?.network + '/' : ''}tokens`}
        onClick={onMenuClick('NFTS')}
      >
        NFTs
      </NavLink>
      <NavLink
        to={`/${currentChain ? currentChain?.network + '/' : ''}collections`}
        onClick={onMenuClick('COLLECTIONS')}
      >
        Collections
      </NavLink>
    </>
  );
};

export default Menu;
