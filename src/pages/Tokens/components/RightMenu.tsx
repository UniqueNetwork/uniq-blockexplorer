import React, { FC } from 'react';
import { Icon, Select } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { SelectOptionProps } from '@unique-nft/ui-kit/dist/cjs/types';

import { OPTIONS } from '@app/pages/Tokens/constants';
import { ViewType } from '@app/pages/Tokens/components/TokensComponent';

interface RightMenuProps {
  defaultOption: string;
  selectFilter: (selected: SelectOptionProps) => void;
  selectGrid: () => void;
  selectList: () => void;
  selectOption?: SelectOptionProps;
  view: ViewType;
}

export const RightMenu: FC<RightMenuProps> = ({
  defaultOption,
  selectFilter,
  selectGrid,
  selectList,
  selectOption,
  view,
}) => {
  return (
    <RightTabMenu>
      <Select
        defaultValue={defaultOption}
        options={OPTIONS}
        value={selectOption?.id as string}
        onChange={selectFilter}
      />
      <Controls>
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

  @media (max-width: 767px) {
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
