import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styled from 'styled-components/macro';

import { DeviceSizes } from '@app/hooks';

interface TabsProps {
  additionalContent?: ReactNode | ReactNode[];
  content: ReactNode[];
  currentTabIndex: number;
  setCurrentTabIndex: (currentTabIndex: number) => void;
  tabsClassNames?: string[];
}

export const Tabs: FC<TabsProps> = ({
  additionalContent,
  content,
  currentTabIndex,
  setCurrentTabIndex,
  tabsClassNames,
}) => (
  <TabsHeader className="router-tabs">
    <TabsList>
      {content.map((contentItem: ReactNode, index: number) => (
        <Tab
          className={classNames(tabsClassNames?.[index], {
            active: currentTabIndex === index,
          })}
          key={`tab-${index}`}
          onClick={() => setCurrentTabIndex(index)}
        >
          {contentItem}
        </Tab>
      ))}
    </TabsList>
    {!!additionalContent && additionalContent}
  </TabsHeader>
);

const TabsHeader = styled.div`
  position: relative;
  margin-bottom: calc(var(--gap) * 1.5);

  .right-tab-menu {
    position: absolute;
    right: 0;
    top: 10px;

    @media (max-width: ${DeviceSizes.sm}) {
      display: none;
    }
  }
`;

const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid var(--grey-300);
`;

const Tab = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  text-transform: capitalize;
  height: 40px;
  padding: calc(var(--gap) / 2) var(--gap) calc(var(--gap) * 1.5) var(--gap);
  cursor: pointer;
  display: flex;
  align-items: center;

  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column-gap: calc(var(--gap) / 4);
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-column-gap: calc(var(--gap) / 4);
  }

  small {
    font-size: 12px;
  }

  &.active {
    color: var(--primary-500);
    border-bottom: 2px solid var(--primary-500);
  }

  &.disabled {
    color: var(--grey-300);
    cursor: not-allowed;
  }
`;
