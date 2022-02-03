import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import ArrowDownUp from './ArrowDownUp';
import { CollectionSorting } from '../api/graphQL';

interface TableSortableColumnProps {
  dataIndex: string
  title: string;
  orderBy: Record<string, 'asc' | 'desc'>
  onOrderChange(sorting: CollectionSorting): void
}

const TableSortableColumnTitle: FC<TableSortableColumnProps> = ({ dataIndex, onOrderChange, orderBy, title }) => {
  const direction = useMemo(() => {
    if (orderBy[dataIndex] === 'asc') return 'up';
    if (orderBy[dataIndex] === 'desc') return 'down';

    return 'both';
  }, [orderBy, dataIndex]);

  const onArrowsClick = useCallback(() => {
    let orderValue;

    if (!orderBy[dataIndex]) orderValue = 'asc';
    if (orderBy[dataIndex] === 'asc') orderValue = 'desc';

    onOrderChange({ ...orderBy, [dataIndex]: orderValue });
  }, [orderBy, dataIndex, onOrderChange]);

  return (
    <>
      <ColumnTitleText color={'grey-500'}>{title}</ColumnTitleText>
      <ArrowDownUp
        direction={direction}
        onClick={onArrowsClick}
      />
    </>
  );
};

const ColumnTitleText = styled(Text)`
  margin-right: calc(var(--gap) / 2);
`;

export default TableSortableColumnTitle;
