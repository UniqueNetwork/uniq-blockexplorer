import React, { FC } from 'react';
import styled from 'styled-components';

import { Select, SelectOptionProps, SVGIcon, ViewType } from '@app/components';
import { DeviceSizes } from '@app/hooks';
import { OPTIONS } from '@app/pages/Tokens/constants';

interface RightMenuProps {
  defaultSort: string;
  selectSort: (selected: SelectOptionProps) => void;
  selectGrid: () => void;
  selectList: () => void;
  sort?: SelectOptionProps;
  view: ViewType;
}

export const RightMenu: FC<RightMenuProps> = ({
  defaultSort,
  selectSort,
  selectGrid,
  selectList,
  sort,
  view,
}) => {
  return (
    <RightTabMenu className="right-tab-menu">
      <Select
        defaultValue={defaultSort}
        options={OPTIONS}
        value={sort?.id as string}
        onChange={selectSort}
      />
      <Controls className="controls">
        <ViewButtons>
          <ViewButton onClick={selectList}>
            <SVGIcon
              color={view === ViewType.List ? 'var(--link-color)' : ''}
              name="list"
              width={32}
              height={32}
            />
          </ViewButton>
          <ViewButton onClick={selectGrid}>
            <SVGIcon
              color={view === ViewType.Grid ? 'var(--link-color)' : ''}
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
  display: flex;
  align-items: center;
  grid-column-gap: 44px;
  @media (max-width: ${DeviceSizes.md}) {
    display: none;
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
