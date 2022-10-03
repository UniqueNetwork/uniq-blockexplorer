import { Text } from '@unique-nft/ui-kit';
import { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';

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

    if (!orderBy[dataIndex]) orderValue = 'asc_nulls_first';

    if (orderBy[dataIndex] === 'asc_nulls_first') orderValue = 'desc_nulls_last';

    // If the current sorting is in the same column, change the value to the opposite
    if (dataIndex === Object.keys(orderBy)[0] && orderValue !== 'desc_nulls_last') {
      orderValue = 'asc_nulls_first';
    }

    onOrderChange({ [dataIndex]: orderValue });
  }, [orderBy, dataIndex]);

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
  @media (max-width: 1023px) {
    display: none;
  }
`;

export default TableSortableColumnTitle;
