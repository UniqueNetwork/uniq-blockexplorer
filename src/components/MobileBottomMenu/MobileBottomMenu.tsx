import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { SVGIcon, ViewType } from '@app/components';
import MenuContext from '@app/menuContext/menuContext';

interface MobileBottomMenuProps {}

export const MobileBottomMenu: FC<MobileBottomMenuProps> = () => {
  const { view, setView } = useContext(MenuContext);

  const toggleView = () => {
    setView(view === ViewType.List ? ViewType.Grid : ViewType.List);
  };

  return (
    <Wrapper className="mobile-bottom-menu">
      <Buttons>
        <ButtonItem className="mobile-bottom-menu__filters">
          <SVGIcon name="filter" width={32} height={32} />
        </ButtonItem>
        <ButtonItem className="mobile-bottom-menu__search">
          <SVGIcon name="search" width={32} height={32} />
        </ButtonItem>
        <ButtonItem className="mobile-bottom-menu__view" onClick={toggleView}>
          <SVGIcon
            color="white"
            name={view === ViewType.List ? 'list' : 'grid'}
            width={32}
            height={32}
          />
          <Mark>
            <SVGIcon name="mark" width={12} height={12} />
          </Mark>
        </ButtonItem>
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: calc(var(--gap) * 2);
  width: 100%;
`;
const Buttons = styled.div`
  background-color: var(--link-color);
  border-radius: 16px;
  display: flex;
`;
const ButtonItem = styled.div`
  position: relative;
  width: 32px;
`;
const Mark = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
