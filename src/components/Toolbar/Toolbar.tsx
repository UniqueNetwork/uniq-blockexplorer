import { Button, Toggle } from '@unique-nft/ui-kit';
import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { LocalizedStringWithDefault } from '@unique-nft/api';

import {
  GlobalSearch,
  Select,
  SelectOptionProps,
  SVGIcon,
  ViewType,
} from '@app/components';
import { deviceWidth, TParam, useLocationPathname, useQueryParams } from '@app/hooks';
import { defaultOrderId, OPTIONS as tokensOptions } from '@app/pages/Tokens/constants';
import { OPTIONS as collectionsOptions } from '@app/pages/Collections/constants';
import { OPTIONS as bundlesOptions } from '@app/pages/Bundles/constants';
import AttributesFilter from '@app/pages/Tokens/components/AttributesFilter';
import { ChosenAttributesMap } from '@app/api';
import { AttributeValue } from '@app/api/graphQL/attributes/types';

import { MobileModal } from '../MobileModal/MobileModal';

let localScroll: number;

export enum MobileType {
  Filter = 'Filter',
  Search = 'Search',
}

export const Toolbar = () => {
  const { view, setParamToQuery, sort, nesting, collectionId, attributes } =
    useQueryParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleToolbar, setVisibleToolbar] = useState(true);
  const { tokensPage, collectionsPage, bundlesPage, notTheMainPage } =
    useLocationPathname();
  const [mobileType, setMobileType] = useState(MobileType.Filter);
  const searchRef: React.RefObject<HTMLInputElement> = createRef();

  const toolbarIsActive = notTheMainPage;
  const showFilter = notTheMainPage && (tokensPage || collectionsPage || bundlesPage);
  const showView = notTheMainPage && (tokensPage || collectionsPage || bundlesPage);

  const [statePrev, setStatePrev] = useState<{ sort?: string; nesting?: string }>();
  const [stateNew, setStateNew] = useState<{ sort?: string; nesting?: string }>();

  const [sortLocal, setSortLocal] = useState<SelectOptionProps>();
  const [nestingLocal, setNestingLocal] = useState<string | undefined>(
    nesting || 'false',
  );
  const [allDefaultSettings, setAllDefaultSettings] = useState<boolean>(true);

  const itIsNoChange = () => {
    return stateNew?.sort === statePrev?.sort && stateNew?.nesting === statePrev?.nesting;
  };

  useEffect(() => {
    checkDefaultSettings();
  }, [sortLocal, nestingLocal]);

  const checkDefaultSettings = () => {
    if (sortLocal && sortLocal.id !== defaultOrderId.toString()) {
      setAllDefaultSettings(false);
      return;
    }

    if (collectionsPage && nestingLocal && nestingLocal !== 'false') {
      setAllDefaultSettings(false);
      return;
    }

    setAllDefaultSettings(true);
  };

  // by opening modal
  useEffect(() => {
    //set the both state equal
    setStatePrev({ sort });
    setStateNew({ sort });

    if (visibleModal && collectionsPage) {
      setNestingLocal(nesting);
      setStatePrev({ sort, nesting });
      setStateNew({ sort, nesting });
    }
  }, [collectionsPage, visibleModal]);

  const getSortingOptions = () => {
    if (collectionsPage) {
      return collectionsOptions;
    } else if (bundlesPage) {
      return bundlesOptions;
    } else if (tokensPage) {
      return tokensOptions;
    }

    return tokensOptions;
  };

  const nestingToggled = () => {
    setStateNew({ ...stateNew, nesting: nestingLocal === 'true' ? 'false' : 'true' });
    setNestingLocal(nestingLocal === 'true' ? 'false' : 'true');
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchRef]);

  const Options = getSortingOptions();

  const selectSorting = (selected: SelectOptionProps) => {
    const option = Options.find((item) => {
      return item.id === selected.id;
    });

    if (option && option.sortField) {
      setSortLocal(option);
      setStateNew({ ...stateNew, sort: `${option.sortField}-${option.sortDir}` });
    }
  };

  useEffect(() => {
    const splitSort = sort?.split('-');
    const currentSorting = Options.find((option) => {
      if (splitSort) {
        return option.sortDir === splitSort[1] && option.sortField === splitSort[0];
      }
    });
    setSortLocal(currentSorting);
    setStatePrev({ sort });
    checkDefaultSettings();
  }, [sort]);

  useEffect(() => {
    setNestingLocal(nesting);
    checkDefaultSettings();
  }, [nesting]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  // attributes filter
  const [selectedAttrs, setSelectedAttrs] = useState<ChosenAttributesMap>(
    JSON.parse(attributes || '{}')?.attributes || {},
  );
  const [filterChanged, setFilterChanged] = useState(false);

  const filterTokens = useCallback(
    (attributes = selectedAttrs) => {
      setParamToQuery([
        {
          name: 'attributes',
          value: JSON.stringify({ attributes }),
        },
      ]);
    },
    [selectedAttrs],
  );

  const handleCheck = useCallback(
    (checkedKey: string, attribute: AttributeValue, attributeKey: string) => {
      setFilterChanged(true);
      setSelectedAttrs((selectedAttrs) => {
        let newSelectedAttrs: ChosenAttributesMap = {};

        if (!selectedAttrs[checkedKey])
          newSelectedAttrs[checkedKey] = { ...attribute, key: attributeKey };

        for (let key in selectedAttrs) {
          if (key !== checkedKey) newSelectedAttrs[key] = selectedAttrs[key];
        }
        return newSelectedAttrs;
      });
    },
    [],
  );

  const handleTagRemove = useCallback(
    (tag: string) => {
      setFilterChanged(true);
      setSelectedAttrs((selectedAttrs) => {
        let newSelectedAttrs: ChosenAttributesMap = {};
        for (let key in selectedAttrs) {
          const attrValue = selectedAttrs[key]?.value;

          if ((attrValue as LocalizedStringWithDefault)?._ !== tag && attrValue !== tag) {
            newSelectedAttrs[key] = selectedAttrs[key];
          }
        }
        filterTokens(newSelectedAttrs);

        return newSelectedAttrs;
      });
    },
    [filterTokens],
  );

  const handleApplyClick = () => {
    const params: [TParam] = [] as unknown as [TParam];

    if (collectionsPage && stateNew?.nesting) {
      params.push({ name: 'nesting', value: `${stateNew?.nesting}` });
    }

    if (stateNew?.sort) {
      params.push({ name: 'sort', value: `${stateNew?.sort}` });
    }

    if (tokensPage && collectionId) {
      filterTokens();
    }

    setParamToQuery(params);

    setVisibleModal(false);
  };

  const handleResetAll = () => {
    const option = Options.find((item) => {
      return item.id === defaultOrderId.toString();
    });

    if (!collectionsPage && option && option.sortField) {
      setSortLocal(option);
      setStateNew({ sort: `${option.sortField}-${option.sortDir}` });
    }

    if (collectionsPage && option) {
      setNestingLocal('false');
      setSortLocal(option);
      setStateNew({ sort: `${option.sortField}-${option.sortDir}`, nesting: 'false' });
    }

    if (tokensPage && collectionId) {
      setSelectedAttrs({});
      // filterTokens({});
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

    if (documentScroll > 0 && documentScroll > localScroll) {
      setVisibleToolbar(false);
    } else {
      setVisibleToolbar(true);
    }

    localScroll = document.body.scrollTop || document.documentElement.scrollTop;
  };

  const toggleView = () => {
    setParamToQuery([
      { name: 'view', value: view === ViewType.List ? ViewType.Grid : ViewType.List },
    ]);
  };

  const closeModal = () => {
    setVisibleModal(false);
    setNestingLocal(statePrev?.nesting);

    const splitSort = statePrev?.sort?.split('-');
    const currentSorting = Options.find((option) => {
      if (splitSort) {
        return option.sortDir === splitSort[1] && option.sortField === splitSort[0];
      }
    });
    setSortLocal(currentSorting);

    setSelectedAttrs(JSON.parse(attributes || '{}')?.attributes || {});
  };

  const ModalContent = useMemo(() => {
    switch (mobileType) {
      case MobileType.Search:
        return (
          <SearchWrapper>
            <GlobalSearch searchRef={searchRef} />
          </SearchWrapper>
        );
      case MobileType.Filter:
      default:
        return (
          <>
            <SelectWrapper>
              <Select
                options={Options}
                value={sortLocal?.id as string}
                onChange={selectSorting}
              />
            </SelectWrapper>
            {tokensPage && collectionId && (
              <AttributesFilter
                selectedAttrs={selectedAttrs}
                collectionId={Number(collectionId)}
                handleTagRemove={handleTagRemove}
                handleCheck={handleCheck}
                handleReset={handleResetAll}
                handleApply={handleApplyClick}
                handleRevert={handleResetAll}
              />
            )}
            {collectionsPage && (
              <Toggle
                label="Only nesting enabled"
                on={nestingLocal === 'true'}
                onChange={nestingToggled}
              />
            )}
          </>
        );
    }
  }, [
    Options,
    collectionId,
    collectionsPage,
    handleApplyClick,
    handleCheck,
    handleResetAll,
    handleTagRemove,
    mobileType,
    nestingLocal,
    nestingToggled,
    searchRef,
    selectSorting,
    selectedAttrs,
    sortLocal?.id,
    tokensPage,
  ]);

  return (
    <>
      <Wrapper className={`${visibleToolbar && toolbarIsActive ? 'show' : 'hide'}`}>
        <Buttons>
          {showFilter && (
            <ButtonItem
              onClick={() => {
                setMobileType(MobileType.Filter);
                setVisibleModal(true);
              }}
            >
              <SVGIcon name="filter" width={32} height={32} />
              {(!allDefaultSettings || !!Object.keys(selectedAttrs).length) && (
                <Mark>
                  <SVGIcon name="mark" width={12} height={12} />
                </Mark>
              )}
            </ButtonItem>
          )}
          <ButtonItem
            onClick={() => {
              setMobileType(MobileType.Search);
              setVisibleModal(true);
            }}
          >
            <SVGIcon name="search" width={32} height={32} />
          </ButtonItem>
          {showView && (
            <ButtonItem onClick={toggleView}>
              <SVGIcon
                color="white"
                name={view === ViewType.List || !view ? 'grid' : 'list'}
                width={32}
                height={32}
              />
            </ButtonItem>
          )}
        </Buttons>
      </Wrapper>

      <MobileModal
        visible={visibleModal && toolbarIsActive}
        title={mobileType === MobileType.Filter ? 'Filter and sort' : 'Search'}
        actions={
          mobileType === MobileType.Filter ? (
            <>
              <Button
                wide
                disabled={
                  tokensPage && collectionId
                    ? !filterChanged && itIsNoChange()
                    : itIsNoChange()
                }
                title="Apply"
                role="primary"
                onClick={handleApplyClick}
              />
              <Button
                disabled={
                  tokensPage && collectionId
                    ? !Object.keys(selectedAttrs).length && allDefaultSettings
                    : allDefaultSettings
                }
                title="Reset All"
                role="danger"
                onClick={handleResetAll}
              />
            </>
          ) : null
        }
        onCloseModal={closeModal}
      >
        {ModalContent}
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
const Buttons = styled.div`
  background-color: var(--primary-500);
  border-radius: 16px;
  display: flex;
  padding: 20px;
  grid-column-gap: calc(var(--gap) * 2);
  box-shadow: 0 4px 12px rgba(0, 156, 240, 0.32);
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
  > div > div {
    flex-grow: 1;
  }
`;
const SelectWrapper = styled.div`
  width: 100%;
  .unique-select {
    width: 100%;
  }
`;
