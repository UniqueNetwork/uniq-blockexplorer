import { MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components/macro';

import { tokensOptions } from '@app/components/Menu/config';
import { defaultSorting } from '@app/pages/Tokens/constants';
import { isTouchEnabled } from '@app/utils';
import { Dropdown, SVGIcon } from '@app/components';

export const DropdownTokensItem = ({
  currentChain,
  onMenuClick,
  isActive,
}: {
  isActive: boolean;
  currentChain?: string;
  onMenuClick(bullit: string): MouseEventHandler | undefined;
}) => (
  <DropdownStyled
    options={tokensOptions}
    optionRender={({ id, title }: { id: string; title: string }) => (
      <NavLink
        to={`/${
          currentChain ? currentChain + '/' : ''
        }tokens/${id}/?sort=${defaultSorting}`}
        onClick={onMenuClick(id.toUpperCase())}
      >
        <Row>
          <span>{title}</span>
          {id === 'fractional' && (
            <>
              <SVGIconStyled
                data-tip
                data-for="menu-fractional-question"
                name="question"
                height={24}
                width={24}
              />
              <ReactTooltip
                event={isTouchEnabled() ? 'click' : undefined}
                id="menu-fractional-question"
                effect="solid"
                eventOff="mouseleave"
              >
                <span>
                  A&nbsp;fractional token provides a&nbsp;way for many users to&nbsp;own
                  a&nbsp;part of&nbsp;an&nbsp;NFT
                </span>
              </ReactTooltip>
            </>
          )}
        </Row>
      </NavLink>
    )}
  >
    <>
      <ItemStyled isActive={isActive}>Tokens</ItemStyled>
      <SVGIcon name="triangle" height={4} width={8} color={'var(--color-primary-500)'} />
    </>
  </DropdownStyled>
);

const DropdownStyled = styled(Dropdown)`
  .dropdown-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    gap: calc(var(--gap) / 4);
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    &.dropped svg {
      transform: rotate(180deg);
    }
  }
  .dropdown-option #menu-fractional-question span {
    color: var(--color-additional-light);
  }
`;

const ItemStyled = styled.span<{ isActive: boolean }>`
  color: ${({ isActive }) =>
    isActive ? 'var(--color-additional-dark)' : 'var(--color-primary-500);'};
`;

const Row = styled.div`
  display: flex;
`;

const SVGIconStyled = styled(SVGIcon)`
  margin-left: 4px;
`;
