import { Button } from '@unique-nft/ui-kit';
import { createRef, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Select, SVGIcon, ViewType } from '@app/components';
import SearchComponent from '@app/components/SearchComponent';
import { deviceWidth } from '@app/hooks';
import { defaultOrderId, OPTIONS } from '@app/pages/Tokens/constants';
import toolbarContext from '@app/toolbarContext/toolbarContext';

import { MobileModal } from '../MobileModal/MobileModal';

let localScroll: number;

export enum MobileType {
  Filter = 'Filter',
  Search = 'Search',
}

export const Toolbar = () => {
  const { view, setView, selectSort, sort } = useContext(toolbarContext);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleToolbar, setVisibleToolbar] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [mobileType, setMobileType] = useState(MobileType.Filter);
  const searchRef: React.RefObject<HTMLInputElement> = createRef();

  const location = useLocation();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchRef]);

  useEffect(() => {
    if (location.pathname.match(`\/(collections|tokens)`)) {
      setCurrentLocation(true);
    } else {
      setCurrentLocation(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  const keydown = (e: { key: string }) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      setVisibleModal(false);
    }
  };

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

  const ModalContent = () => {
    switch (mobileType) {
      case MobileType.Search:
        return (
          <SearchWrapper>
            <SearchComponent
              searchRef={searchRef}
              placeholder="Global search"
              onSearchChange={() => {}}
            />
          </SearchWrapper>
        );
      case MobileType.Filter:
      default:
        return (
          <SelectWrapper>
            <Select options={OPTIONS} value={sort?.id as string} onChange={selectSort} />
          </SelectWrapper>
        );
    }
  };

  return (
    <>
      <Wrapper className={`${visibleToolbar && currentLocation ? 'show' : 'hide'}`}>
        <WrapperShadow />
        <Buttons>
          <ButtonItem
            onClick={() => {
              setMobileType(MobileType.Filter);
              setVisibleModal(true);
            }}
          >
            <SVGIcon name="filter" width={32} height={32} />
            {sort && defaultOrderId != sort?.id && (
              <Mark>
                <SVGIcon name="mark" width={12} height={12} />
              </Mark>
            )}
          </ButtonItem>
          <ButtonItem
            onClick={() => {
              setMobileType(MobileType.Search);
              setVisibleModal(true);
            }}
          >
            <SVGIcon name="search" width={32} height={32} />
          </ButtonItem>
          <ButtonItem onClick={toggleView}>
            <SVGIcon
              color="white"
              name={view === ViewType.List ? 'viewTable' : 'viewGrid'}
              width={32}
              height={32}
            />
          </ButtonItem>
        </Buttons>
      </Wrapper>

      <MobileModal
        visible={visibleModal}
        setVisible={setVisibleModal}
        title={mobileType === MobileType.Filter ? 'Filter and sort' : 'Search'}
        actions={
          mobileType === MobileType.Filter ? (
            <>
              <Button
                wide
                disabled={sort && defaultOrderId == sort?.id}
                title="Apply"
                role="primary"
                onClick={() => {
                  setVisibleModal(false);
                }}
              />
              <Button
                disabled={sort && defaultOrderId == sort?.id}
                title="Reset All"
                role="danger"
                onClick={() => {
                  setVisibleModal(false);
                  selectSort(OPTIONS[3]);
                }}
              />
            </>
          ) : null
        }
      >
        <ModalContent />
      </MobileModal>
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
const Mark = styled.div`
  position: absolute;
  right: -6px;
  top: -7px;
`;
const SearchWrapper = styled.div`
  width: 100%;
  .global-search {
    .unique-input-text {
      width: 100%;
    }
  }
`;
const SelectWrapper = styled.div`
  width: 100%;
  .unique-select {
    width: 100%;
  }
`;
