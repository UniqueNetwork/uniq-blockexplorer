import { useContext } from 'react';
import styled from 'styled-components/macro';

import { UserEvents } from '@app/analytics/user_analytics';
import { Select, SVGIcon, ViewType } from '@app/components';
import { DeviceSizes } from '@app/hooks';
import { OPTIONS } from '@app/pages/Tokens/constants';
import ToolbarContext from '@app/toolbarContext/toolbarContext';
import { logUserEvents } from '@app/utils';

export const RightMenu = () => {
  const { sort, selectSort, view, setView } = useContext(ToolbarContext);

  return (
    <RightTabMenu className="right-tab-menu">
      <Select options={OPTIONS} value={sort?.id as string} onChange={selectSort} />
      <Controls className="controls">
        <ViewButtons>
          <ViewButton
            onClick={() => {
              logUserEvents(UserEvents.Click.ON_LIST_VIEW_NFTS);
              setView(ViewType.List);
            }}
          >
            <SVGIcon
              color={view === ViewType.List ? 'var(--primary-500)' : ''}
              name="list"
              width={32}
              height={32}
            />
          </ViewButton>
          <ViewButton
            onClick={() => {
              logUserEvents(UserEvents.Click.ON_GRID_VIEW_NFTS);
              setView(ViewType.Grid);
            }}
          >
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
