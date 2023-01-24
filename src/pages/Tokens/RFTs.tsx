import { FC, useState } from 'react';

import { TokenSorting } from '@app/api';
import { SelectOptionProps, ViewType } from '@app/components';

import RFTsComponent from './components/RFTsComponents/RFTsComponent';

interface RFTsProps {
  orderBy: TokenSorting;
  setOrderBy: (orderBy: TokenSorting) => void;
  pageSize: SelectOptionProps;
  setPageSize: (pageSize: SelectOptionProps) => void;
  view: ViewType;
}

export const RFTs: FC<RFTsProps> = ({
  orderBy,
  setOrderBy,
  pageSize,
  setPageSize,
  view,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <RFTsComponent
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
