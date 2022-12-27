import { FC, useState } from 'react';

import { TokenSorting } from '@app/api';
import { SelectOptionProps } from '@app/components';

import TokensComponent, { ViewType } from './components/NFTsComponents/TokensComponent';

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
    />
  );
};
