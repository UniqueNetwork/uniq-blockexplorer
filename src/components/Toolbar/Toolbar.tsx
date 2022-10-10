import { Button } from '@unique-nft/ui-kit';
import { createRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Select, SelectOptionProps, SVGIcon, ViewType } from '@app/components';
import SearchComponent from '@app/components/SearchComponent';
import { deviceWidth, useLocationPathname, useQueryParams } from '@app/hooks';
import { defaultOrderId, OPTIONS as tokensOptions } from '@app/pages/Tokens/constants';
import {
  defaultSorting,
  OPTIONS as collectionsOptions,
} from '@app/pages/Collections/constants';

import { MobileModal } from '../MobileModal/MobileModal';

let localScroll: number;

export enum MobileType {
  Filter = 'Filter',
  Search = 'Search',
}

export const Toolbar = () => {
  const { view, setParamToQuery, sort: sortFromQuery } = useQueryParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleToolbar, setVisibleToolbar] = useState(true);
  const { tokensOrCollectionsPage: toolbarIsActive } = useLocationPathname();
  const [mobileType, setMobileType] = useState(MobileType.Filter);
  const searchRef: React.RefObject<HTMLInputElement> = createRef();

  const location = useLocation();

  const [statePrev, setStatePrev] = useState<{ sort?: string }>({ sort: sortFromQuery });
  const [stateNew, setStateNew] = useState<{ sort?: string }>();

  const [sort, setSort] = useState<SelectOptionProps>();
  const [allDefaultSettings, setAllDefaultSettings] = useState<boolean>(true);

  const getSortingOptions = () => {
    if (location.pathname.match(`/(collections)`)) {
      return collectionsOptions;
    } else if (location.pathname.match(`/(tokens)`)) {
      return tokensOptions;
    }

    return tokensOptions;
  };

  const Options = getSortingOptions();

  const selectSorting = (selected: SelectOptionProps) => {
    const option = Options.find((item) => {
      return item.id === selected.id;
    });

    if (option && option.sortField) {
      setSort(option);
      // setOrderBy({ [option.sortField]: option.sortDir });
      setStateNew({ sort: `${option.sortField}-${option.sortDir}` });
    }
  };

  useEffect(() => {
    const splitSort = sortFromQuery?.split('-');
    const currentSorting = Options.find((option) => {
      if (splitSort) {
        return option.sortDir === splitSort[1] && option.sortField === splitSort[0];
      }
    });
    setSort(currentSorting);
    setStatePrev({ sort: sortFromQuery });
    checkDefaultSettings();
  }, [sortFromQuery]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  const handleApplyClick = () => {
    setParamToQuery('sort', `${stateNew?.sort}`);
    setStatePrev({ sort: `${stateNew?.sort}` });
    setVisibleModal(false);
    setStateNew(undefined);
  };

  const handleResetAll = () => {
    const option = Options.find((item) => {
      return item.id === '3';
    });

    if (option && option.sortField) {
      setSort(option);
      // setOrderBy({ [option.sortField]: option.sortDir });
      setStateNew({ sort: `${option.sortField}-${option.sortDir}` });
    }

    setAllDefaultSettings(true);
  };

  const checkDefaultSettings = () => {
    if (sort && sort.id !== defaultOrderId.toString()) {
      setAllDefaultSettings(false);
      return;
    }

    setAllDefaultSettings(true);
  };

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
    setParamToQuery('view', view === ViewType.List ? ViewType.Grid : ViewType.List);
  };

  const ModalContent = () => {
    switch (mobileType) {
      case MobileType.Search:
        return (
          <SearchWrapper>
            <SearchComponent
              // searchRef={searchRef}
              placeholder="Global search"
              onSearchChange={() => {}}
            />
          </SearchWrapper>
        );
      case MobileType.Filter:
      default:
        return (
          <SelectWrapper>
            <Select
              options={Options}
              value={sort?.id as string}
              onChange={selectSorting}
            />
          </SelectWrapper>
        );
    }
  };

  return (
    <>
      <Wrapper className={`${visibleToolbar && toolbarIsActive ? 'show' : 'hide'}`}>
        <WrapperShadow />
        <Buttons>
          <ButtonItem
            onClick={() => {
              setMobileType(MobileType.Filter);
              setVisibleModal(true);
            }}
          >
            <SVGIcon name="filter" width={32} height={32} />
            {sort && defaultOrderId !== sort?.id && (
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
              name={view === ViewType.List ? 'list' : 'grid'}
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
                disabled={!stateNew || statePrev.sort === stateNew?.sort}
                title="Apply"
                role="primary"
                onClick={handleApplyClick}
              />
              <Button
                disabled={allDefaultSettings}
                title="Reset All"
                role="danger"
                onClick={handleResetAll}
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
