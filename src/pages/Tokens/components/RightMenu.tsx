import { FC, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSearchParams } from 'react-router-dom';

import { OPTIONS } from '@app/pages/Tokens/constants';
import { ViewType } from '@app/pages/Tokens/components/TokensComponent';
import { deviceWidth, useQueryParams } from '@app/hooks';
import { Select, SelectOptionProps, SVGIcon } from '@app/components';
import AttributesFilter from '@app/pages/Tokens/components/AttributesFilter';
import { TokenAttributeFilterItem } from '@app/api';

interface RightMenuProps {
  selectSort: (selected: SelectOptionProps) => void;
  selectGrid: () => void;
  selectList: () => void;
  view: ViewType;
  setAttributesFilter: (filterState: TokenAttributeFilterItem[]) => void;
}

export const RightMenu: FC<RightMenuProps> = ({
  selectSort,
  selectGrid,
  selectList,
  view,
  setAttributesFilter,
}) => {
  const [queryParams] = useSearchParams();
  const { collectionId } = useQueryParams();

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
      {!!collectionId && (
        <AttributesFilter
          collectionId={Number(collectionId)}
          setAttributesFilter={setAttributesFilter}
        />
      )}
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

const RightTabMenu = styled.div`
  display: none;
  align-items: center;
  grid-column-gap: 44px;
  @media ${deviceWidth.biggerThan.md} {
    display: flex;
  }
`;

const SelectStyled = styled(Select)`
  width: 180px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

const ViewButtons = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: calc(var(--gap) / 2);
`;

const ViewButton = styled.div`
  display: flex;
  cursor: pointer;
  height: 32px;
`;
