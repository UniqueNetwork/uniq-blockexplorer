import React, { FC } from 'react';
import { Icon } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import { OPTIONS } from '@app/pages/Tokens/constants';
import { ViewType } from '@app/pages/Tokens/components/TokensComponent';
import { DeviceSizes } from '@app/hooks';
import { Select, SelectOptionProps } from '@app/components';

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
            <Icon
              file={
                view === ViewType.List ? '/static/list_active.svg' : '/static/list.svg'
              }
              size={32}
            />
          </ViewButton>
          <ViewButton onClick={selectGrid}>
            <Icon
              file={
                view === ViewType.Grid ? '/static/grid_active.svg' : '/static/grid.svg'
              }
              size={32}
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
