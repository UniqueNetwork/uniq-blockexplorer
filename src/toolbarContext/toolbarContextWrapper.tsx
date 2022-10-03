import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TokenSorting } from '@app/api/graphQL/tokens/types';
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
  const [sort, selectSort] = useState<SelectOptionProps>(OPTIONS[3]);
  const [orderBy, setOrderBy] = useState<TokenSorting>(defaultOrderBy);
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    const sortFromQuery = queryParams.get('sort');
    const splitSort = sortFromQuery?.split('-');
    const currentSorting = OPTIONS.find((option) => {
      if (splitSort) {
        return option.sortDir === splitSort[1] && option.sortField === splitSort[0];
      }
    });

    if (currentSorting) {
      selectSort(currentSorting);
    }
  }, [queryParams]);

  useEffect(() => {
    if (sort && sort.sortField) {
      queryParams.set('sort', `${sort.sortField}-${sort.sortDir}`);
      setQueryParams(queryParams);
      setOrderBy({ [`${sort.sortField}`]: sort.sortDir });
    }
  }, [sort]);

  const value = useMemo<ToolbarContextProps>(
    () => ({
      view,
      setView,
      searchString,
      setSearchString,
      sort,
      selectSort,
      queryParams,
      setQueryParams,
      orderBy,
      setOrderBy,
    }),
    [view, searchString, sort, queryParams, setQueryParams, orderBy],
  );

  return <ToolbarProvider value={value}>{children}</ToolbarProvider>;
};

export default ToolbarContextWrapper;
