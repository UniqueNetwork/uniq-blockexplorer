import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { SVGIcon, ViewType } from '@app/components';
import { deviceWidth } from '@app/hooks';
import MenuContext from '@app/menuContext/menuContext';

import { MobileModal } from '../MobileModal/MobileModal';

let localScroll: number;

export const MobileBottomMenu = () => {
  const { view, setView } = useContext(MenuContext);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleToolbar, setVisibleToolbar] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  const listenToScroll = () => {
    const documentScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (documentScroll > localScroll) {
      setVisibleToolbar(false);
    } else {
      setVisibleToolbar(true);
    }

    localScroll = document.body.scrollTop || document.documentElement.scrollTop;
  };

  const toggleView = () => {
    setView(view === ViewType.List ? ViewType.Grid : ViewType.List);
  };

  return (
    <>
      <Wrapper className={`${visibleToolbar ? 'show' : 'hide'}`}>
        <WrapperShadow />
        <Buttons>
          <ButtonItem onClick={() => setVisibleModal(true)}>
            <SVGIcon name="filter" width={32} height={32} />
          </ButtonItem>
          <ButtonItem className="mobile-bottom-menu__search">
            <SVGIcon name="search" width={32} height={32} />
          </ButtonItem>
          <ButtonItem className="mobile-bottom-menu__view" onClick={toggleView}>
            <SVGIcon
              color="white"
              name={view === ViewType.List ? 'viewTable' : 'viewGrid'}
              width={32}
              height={32}
            />
          </ButtonItem>
        </Buttons>
      </Wrapper>
      <MobileModal visible={visibleModal} setVisible={setVisibleModal} />
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 3;
  bottom: calc(var(--gap) * 2);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  @media ${deviceWidth.biggerThan.md} {
    display: none;
  }
  &.show {
    transform: translateY(0);
  }
  &.hide {
    transform: translateY(110px);
  }
`;
const WrapperShadow = styled.div`
  display: flex;
  background: var(--color-primary-500);
  position: absolute;
  width: 192px;
  filter: blur(8px);
  height: 72px;
  bottom: -8px;
  border-radius: 16px;
`;
const Buttons = styled.div`
  background-color: var(--primary-500);
  border-radius: 16px;
  display: flex;
  padding: 20px;
  grid-column-gap: calc(var(--gap) * 2);
`;
const ButtonItem = styled.div`
  cursor: pointer;
  position: relative;
  width: 32px;
`;
