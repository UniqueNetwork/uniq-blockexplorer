import { FC, useState } from 'react';

import { useSearchFromQuery } from '@app/hooks';
import { TokenSorting } from '@app/api';
import { SelectOptionProps } from '@app/components';

import TokensComponent, { ViewType } from './components/TokensComponent';

interface NFTsProps {
  orderBy: TokenSorting;
  setOrderBy: (orderBy: TokenSorting) => void;
  pageSize: SelectOptionProps;
  setPageSize: (pageSize: SelectOptionProps) => void;
  setTokensCount: (tokensCount: number) => void;
  view: ViewType;
}

export const NFTs: FC<NFTsProps> = ({
  orderBy,
  setOrderBy,
  pageSize,
  setPageSize,
  setTokensCount,
  view,
}) => {
  const searchFromQuery = useSearchFromQuery();
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
      setTokensCount={setTokensCount}
      view={view}
    />
  );
};