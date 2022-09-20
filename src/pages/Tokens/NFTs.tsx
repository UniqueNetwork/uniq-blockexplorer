import { FC, useState } from 'react';

import { useSearchFromQuery } from '@app/hooks';
import { TokenSorting } from '@app/api';
import { SelectOptionProps, ViewType } from '@app/components';

import TokensComponent from './components/TokensComponent';

interface NFTsProps {
  orderBy: TokenSorting;
  setOrderBy: (orderBy: TokenSorting) => void;
  pageSize: SelectOptionProps;
  setPageSize: (pageSize: SelectOptionProps) => void;
  view: ViewType;
}

export const NFTs: FC<NFTsProps> = ({
  orderBy,
  setOrderBy,
  pageSize,
  setPageSize,
  view,
}) => {
  const { searchString: searchFromQuery } = useSearchFromQuery();
  const [searchString, setSearchString] = useState<string | undefined>(searchFromQuery);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <TokensComponent
      currentPage={currentPage}
      orderBy={orderBy}
      pageSize={pageSize}
      setPageSize={setPageSize}
      searchString={searchString}
      setCurrentPage={setCurrentPage}
      setSearchString={setSearchString}
      setOrderBy={setOrderBy}
      view={view}
    />
  );
};
