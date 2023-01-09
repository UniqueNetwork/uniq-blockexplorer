import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components/macro';
import { Text } from '@unique-nft/ui-kit';

import { Sorting } from '@app/api/graphQL/types';

import ArrowDownUp from './ArrowDownUp';

interface TableSortableColumnProps {
  dataIndex: string;
  title: string;
  orderBy: Sorting;
  onOrderChange(sorting: Sorting): void;
}

const TableSortableColumnTitle: FC<TableSortableColumnProps> = ({
  dataIndex,
  onOrderChange,
  orderBy,
  title,
}) => {
  const direction = useMemo(() => {
    if (orderBy[dataIndex] === 'asc_nulls_first') return 'up';

    if (orderBy[dataIndex] === 'desc_nulls_last') return 'down';

    return 'both';
  }, [orderBy, dataIndex]);

  const onArrowsClick = useCallback(() => {
    let orderValue;

    if (!orderBy[dataIndex]) orderValue = 'desc_nulls_last';

    if (orderBy[dataIndex] === 'desc_nulls_last') orderValue = 'asc_nulls_first';

    if (orderBy[dataIndex] === 'asc_nulls_first') orderValue = undefined;

    onOrderChange({ [dataIndex]: orderValue });
  }, [orderBy, dataIndex, onOrderChange]);

  return (
    <>
      <ColumnTitleText color="grey-500">{title}</ColumnTitleText>
      <StyledArrowDownUp direction={direction} onClick={onArrowsClick} />
    </>
  );
};

const ColumnTitleText = styled(Text)`
  margin-right: calc(var(--gap) / 2);
`;

const StyledArrowDownUp = styled(ArrowDownUp)`
  @media (max-width: 991px) {
    display: none;
  }
`;

export default TableSortableColumnTitle;
