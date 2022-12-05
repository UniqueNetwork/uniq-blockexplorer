import { FC, useState } from 'react';

import { TokenAttributeFilterItem, TokenSorting } from '@app/api';
import { SelectOptionProps } from '@app/components';

import TokensComponent, { ViewType } from './components/TokensComponent';

interface NFTsProps {
  orderBy: TokenSorting;
  setOrderBy: (orderBy: TokenSorting) => void;
  pageSize: SelectOptionProps;
  setPageSize: (pageSize: SelectOptionProps) => void;
  view: ViewType;
  attributesFilter: TokenAttributeFilterItem[];
}

export const NFTs: FC<NFTsProps> = ({
  orderBy,
  setOrderBy,
  pageSize,
  setPageSize,
  view,
  attributesFilter,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <TokensComponent
      currentPage={currentPage}
      orderBy={orderBy}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
      setOrderBy={setOrderBy}
      view={view}
      attributesFilter={attributesFilter}
    />
  );
};
