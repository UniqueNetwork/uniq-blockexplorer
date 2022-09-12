import { FC, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { DeviceSizes } from '@app/hooks';

interface TabsProps {
  additionalContent?: ReactNode | ReactNode[];
  basePath: string;
  content: ReactNode[];
  tabsClassNames: string[];
  tabUrls: string[];
}

export const Tabs: FC<TabsProps> = ({
  additionalContent,
  basePath,
  content,
  tabsClassNames,
  tabUrls,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTabIndex = tabUrls.findIndex((tab: string) =>
    location.pathname.includes(`${basePath}/${tab}`),
  );

  const handleClick = (tabIndex: number) => {
    if (tabsClassNames[tabIndex] === 'disabled') {
      return;
    }

    navigate(`${basePath}/${tabUrls[tabIndex]}`);
  };

  useEffect(() => {
    if (location.pathname === basePath || location.pathname === `${basePath}/`) {
      navigate(tabUrls[0]);
    }
  }, [basePath, location.pathname, navigate]);

  return (
    <TabsHeader>
      <TabsList>
        {tabUrls.map((tab, index: number) => (
          <Tab
            className={classNames(tabsClassNames[index], {
              active: currentTabIndex === index,
            })}
            onClick={() => handleClick(index)}
          >
            {content[index]}
          </Tab>
        ))}
      </TabsList>
      {!!additionalContent && additionalContent}
    </TabsHeader>
  );
};

const TabsHeader = styled.div`
  position: relative;
  margin-bottom: calc(var(--gap) * 1.5);

  @media (max-width: ${DeviceSizes.sm}) {
    margin-bottom: 0;
  }

  .right-tab-menu {
    position: absolute;
    right: 0;
    top: var(--gap);

    @media (max-width: ${DeviceSizes.sm}) {
      display: grid;
      grid-template-columns: 1fr 72px;
      grid-column-gap: var(--gap);
      position: relative;
      right: 0;
      top: 0;
      padding: var(--gap) 0;

      .unique-select {
        width: auto;
      }
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
  display: flex;
  align-items: center;
  grid-column-gap: calc(var(--gap) / 4);
  padding: calc(var(--gap) / 2) var(--gap) calc(var(--gap) * 2) var(--gap);
  cursor: pointer;

  &.active {
    color: var(--link-color);
    border-bottom: 2px solid var(--link-color);
  }

  &.disabled {
    cursor: not-allowed;
  }
`;
