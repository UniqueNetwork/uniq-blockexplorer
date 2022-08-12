import React, { FC } from 'react';
import { ColumnType, DefaultRecordType, GetRowKey } from 'rc-table/lib/interface';
import RCTable from 'rc-table';
import styled from 'styled-components';

import LoadingComponent from './LoadingComponent';
import MobileTable from './MobileTable';

interface TableProps<RecordType = DefaultRecordType> {
  hideMobile?: boolean;
  columns?: ColumnType<RecordType>[];
  data?: RecordType[];
  loading?: boolean;
  rowKey?: string | GetRowKey<RecordType>;
}

const Table: FC<TableProps> = ({ columns, data, loading, rowKey }) => {
  return (
    <TableWrapper>
      <RCTable
        columns={columns}
        data={data || []}
        emptyText={'No data'}
        rowKey={rowKey}
      />
      <MobileTable
        columns={columns}
        data={!loading ? data : []}
        loading={loading}
        rowKey={rowKey}
      />
      {loading && <TableLoading />}
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  position: relative;

  .rc-table {
    margin-bottom: calc(var(--gap) * 1.5);

    table {
      width: 100%;
      border-spacing: 0px;
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
        border-bottom: 1px dashed #d2d3d6;
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

  @media (max-width: 767px) {
    .rc-table {
      display: none;
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

export default Table;
