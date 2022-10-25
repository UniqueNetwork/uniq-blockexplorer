import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components/macro';

import { logUserEvents } from '@app/utils/logUserEvents';
import { useApi } from '@app/hooks';
import { defaultSorting } from '@app/pages/Tokens/constants';

import { SVGIcon } from '..';

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
      <Row>
        <NavLink
          to={`/${
            currentChain ? currentChain?.network.toLowerCase() + '/' : ''
          }bundles/?view=List`}
          onClick={onMenuClick('NFTS')}
        >
          Bundles
        </NavLink>
        <SVGIconStyled
          data-tip
          data-for="question"
          name="question"
          height={24}
          width={24}
        />
        <ReactTooltip
          // event={isTouchEnabled() ? 'click' : undefined}
          event="mouseover"
          id="question"
          effect="solid"
          eventOff="mouseleave"
        >
          <span>A tree with nested tokens</span>{' '}
        </ReactTooltip>
      </Row>
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

const Row = styled.div`
  display: flex;
`;

const SVGIconStyled = styled(SVGIcon)`
  margin-left: 4px;
`;

export default Menu;
