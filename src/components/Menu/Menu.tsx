import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { logUserEvents } from '@app/utils/logUserEvents';
import { useApi } from '@app/hooks';
import { defaultSorting } from '@app/pages/Tokens/constants';

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
        to={`/${
          currentChain ? currentChain?.network.toLowerCase() + '/' : ''
        }tokens/nfts/?sort=${defaultSorting}`}
        onClick={onMenuClick('NFTS')}
      >
        Tokens
      </NavLink>
      <NavLink
        to={`/${
          currentChain ? currentChain?.network.toLowerCase() + '/' : ''
        }bundles/?view=List`}
        onClick={onMenuClick('NFTS')}
      >
        Bundles
      </NavLink>
      <NavLink
        to={`/${
          currentChain ? currentChain?.network.toLowerCase() + '/' : ''
        }collections/?sort=${defaultSorting}`}
        onClick={onMenuClick('COLLECTIONS')}
      >
        Collections
      </NavLink>
    </>
  );
};

export default Menu;
