import { FC, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Tabs } from '../Tabs';

interface RouterTabsProps {
  additionalContent?: ReactNode | ReactNode[];
  basePath: string;
  content: ReactNode[];
  tabsClassNames?: string[];
  tabUrls: string[];
  queryParams?: string;
}

export const RouterTabs: FC<RouterTabsProps> = ({
  additionalContent,
  basePath,
  content,
  tabsClassNames,
  tabUrls,
  queryParams,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (tabIndex: number) => {
    if (tabsClassNames?.[tabIndex] === 'disabled') {
      return;
    }

    navigate(`${basePath}/${tabUrls[tabIndex]}${queryParams ? `?${queryParams}` : ''}`);
  };

  const currentTabIndex = tabUrls.findIndex((tab: string) =>
    location.pathname.includes(`${basePath}/${tab}`),
  );

  return (
    <Tabs
      additionalContent={additionalContent}
      content={content}
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={handleClick}
      tabsClassNames={tabsClassNames}
    />
  );
};
