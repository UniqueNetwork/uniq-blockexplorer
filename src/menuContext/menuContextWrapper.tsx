import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useSearchFromQuery } from '@app/hooks';
import { ViewType } from '@app/components';

import { MenuContextProps, MenuProvider } from './menuContext';

interface MenuContextWrapperProps {
  children: ReactNode;
}

const MenuContextWrapper = ({ children }: MenuContextWrapperProps) => {
  const { searchString, setSearchString } = useSearchFromQuery();
  const [view, setView] = useState<ViewType>(ViewType.Grid);

  // get context value for ApiContext
  const value = useMemo<MenuContextProps>(
    () => ({
      view,
      setView,
    }),
    [view, setView],
  );

  return <MenuProvider value={value}>{children}</MenuProvider>;
};

export default MenuContextWrapper;
