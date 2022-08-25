import { FC } from 'react';
import { ColumnType, DefaultRecordType, GetRowKey } from 'rc-table/lib/interface';
import RCTable from 'rc-table';
import styled from 'styled-components';

import LoadingComponent from './LoadingComponent';

interface TableProps<RecordType = DefaultRecordType> {
  hideMobile?: boolean;
  columns?: ColumnType<RecordType>[];
  data?: RecordType[];
  loading?: boolean;
  rowKey?: string | GetRowKey<RecordType>;
}

const ScrollableTable: FC<TableProps> = ({ columns, data, loading, rowKey }) => {
  const minTableWidth = columns?.reduce((accum, item) => {
    return accum + Number(item.width);
  }, 0);
  const paddings = 48;
  const margins = 64;
  const minScreenWidthForTable = (minTableWidth || 500) + paddings + margins;
  const scrollExist = window.innerWidth < minScreenWidthForTable;

  return (
    <ScrollWrapper>
      <TableWrapper minScreenWidthForTable={minScreenWidthForTable}>
        <RCTable
          columns={columns}
          data={data || []}
          emptyText={'No data'}
          rowKey={rowKey}
        />
        {loading && <TableLoading />}
      </TableWrapper>
      {scrollExist && <Mute />}
    </ScrollWrapper>
  );
};

const ScrollWrapper = styled.div`
  position: relative;
`;

const Mute = styled.div`
  position: absolute;
  width: 48px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: linear-gradient(270deg, #ffffff 10.61%, rgba(255, 255, 255, 0) 100%);
`;

const TableWrapper = styled.div.attrs<{ minScreenWidthForTable: number }>((props) => ({
  minScreenWidthForTable: props.minScreenWidthForTable,
}))<{ minScreenWidthForTable: number }>`
  position: relative;

  .rc-table {
    margin-bottom: calc(var(--gap) * 1.5);

    table {
      width: 100%;
      border-spacing: 0;
      table-layout: fixed !important;
    }

    &-thead {
      tr {
        background-color: var(--blue-gray);
      }

      th {
        padding: calc(var(--gap) / 2) var(--gap);
        text-align: left;
        color: var(--grey);
        font-size: 16px;
        font-weight: 500;
      }
    }

    &-tbody {
      td {
        padding: calc(var(--gap) / 2) var(--gap);
        text-align: left;
        font-size: 16px;
        border-bottom: 1px solid #d2d3d6;
        color: var(--grey-600);
        overflow: hidden;
        word-break: break-word;
      }
    }

    &-placeholder {
      td {
        text-align: center;
        color: var(--grey);
        padding: var(--gap) 0 !important;
      }
    }
  }

  @media (max-width: ${(props) => props.minScreenWidthForTable}px) {
    overflow: auto;

    table {
      min-width: ${(props) => props.minScreenWidthForTable}px;
      display: table;
      overflow-x: auto;

      tr > th:first-of-type,
      tr > td:first-of-type {
        position: sticky;
        left: 0;
        background-color: var(--blue-gray);
      }

      tr > td:first-of-type {
        background-color: white;
      }
    }
  }
`;

const TableLoading = styled(LoadingComponent)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  background-color: rgba(255, 255, 255, 0.7);
`;

export default ScrollableTable;
