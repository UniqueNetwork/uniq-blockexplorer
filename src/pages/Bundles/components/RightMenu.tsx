import { FC, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';

import { DeviceSizes, deviceWidth } from '@app/hooks';
import { Select, SelectOptionProps, SVGIcon, ViewType } from '@app/components';

import { OPTIONS } from '../constants';

interface RightMenuProps {
  selectSort: (selected: SelectOptionProps) => void;
  selectGrid: () => void;
  selectList: () => void;
  view: ViewType;
}

export const RightMenu: FC<RightMenuProps> = ({
  selectSort,
  selectGrid,
  selectList,
  view,
}) => {
  const [queryParams] = useSearchParams();

  const [sort, setSort] = useState<SelectOptionProps>();

  useEffect(() => {
    const sortFromQuery = queryParams.get('sort');
    const splitSort = sortFromQuery?.split('-');
    const currentSorting = OPTIONS.find((option) => {
      if (splitSort) {
        return option.sortDir === splitSort[1] && option.sortField === splitSort[0];
      }
    });
    setSort(currentSorting);
  }, [queryParams]);

  return (
    <RightTabMenu className="right-tab-menu">
      {view === ViewType.Grid && (
        <SelectStyled
          options={OPTIONS}
          value={sort?.id as string}
          onChange={selectSort}
        />
      )}
      <Controls className="controls">
        <ViewButtons>
          <ViewButton onClick={selectList}>
            <SVGIcon
              color={view === ViewType.List ? 'var(--primary-500)' : ''}
              name="list"
              width={32}
              height={32}
            />
          </ViewButton>
          <ViewButton onClick={selectGrid}>
            <SVGIcon
              color={view === ViewType.Grid ? 'var(--primary-500)' : ''}
              name="grid"
              width={32}
              height={32}
            />
          </ViewButton>
        </ViewButtons>
      </Controls>
    </RightTabMenu>
  );
};

const SelectStyled = styled(Select)`
  width: 180px;
`;

const RightTabMenu = styled.div`
  display: none;
  align-items: center;
  height: 40px;
  justify-content: flex-end;
  grid-column-gap: 44px;
  border-bottom: 1px solid var(--grey-300);
  padding-bottom: calc(var(--gap) * 1.5);
  @media ${deviceWidth.biggerThan.md} {
    display: flex;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${DeviceSizes.sm}) {
    width: 100%;
  }
`;

const ViewButtons = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) / 2);
`;

const ViewButton = styled.div`
  display: flex;
  cursor: pointer;
  height: 32px;
`;
