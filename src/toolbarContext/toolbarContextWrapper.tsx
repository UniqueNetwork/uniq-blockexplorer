import { ReactNode, useEffect, useMemo, useState } from 'react';

import { SelectOptionProps, ViewType } from '@app/components';
import { useSearchFromQuery } from '@app/hooks';
import { defaultOrderBy, OPTIONS } from '@app/pages/Tokens/constants';

import { ToolbarContextProps, ToolbarProvider } from './toolbarContext';

interface ToolbarContextWrapperProps {
  children: ReactNode;
}

const ToolbarContextWrapper = ({ children }: ToolbarContextWrapperProps) => {
  const { searchString: searchFromQuery } = useSearchFromQuery();
  const [searchString, setSearchString] = useState<string | undefined>(searchFromQuery);
  const [view, setView] = useState<ViewType>(ViewType.Grid);
  const [sort, selectSort] = useState<SelectOptionProps>();

  const defaultSortKey = Object.keys(defaultOrderBy)?.[0];
  const defaultSortValue = Object.values(defaultOrderBy)?.[0];

  const defaultSort =
    OPTIONS.find((option) =>
      sort
        ? option.sortDir === sort.sortDir
        : option.sortDir === defaultSortValue && option.sortField === defaultSortKey,
    )?.id ?? '';

  // get context value for ApiContext
  const value = useMemo<ToolbarContextProps>(
    () => ({
      view,
      setView,
      searchString,
      setSearchString,
      sort,
      selectSort,
      defaultSort,
    }),
    [view, searchString, setSearchString, sort, defaultSort],
  );

  return <ToolbarProvider value={value}>{children}</ToolbarProvider>;
};

export default ToolbarContextWrapper;
