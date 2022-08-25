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
  return (
    <ScrollWrapper>
      <TableWrapper>
        <RCTable
          columns={columns}
          data={data || []}
          emptyText={'No data'}
          rowKey={rowKey}
        />
        {loading && <TableLoading />}
      </TableWrapper>
      <Mute />
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

const TableWrapper = styled.div`
  position: relative;

  .rc-table {
    margin-bottom: calc(var(--gap) * 1.5);

    overflow: auto;

    table {
      width: 100%;
      border-spacing: 0;
      table-layout: fixed !important;
      max-width: 1087px;
      min-width: 1087px;
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
