import React, { FC } from 'react';
import { ColumnType, DefaultRecordType } from 'rc-table/lib/interface';
import RCTable from 'rc-table';
import styled from 'styled-components';

import useDeviceSize, { DeviceSize } from '../hooks/useDeviceSize';
import LoadingComponent from './LoadingComponent';
import MobileTable from './MobileTable';

interface TableProps<RecordType = DefaultRecordType> {
  columns?: ColumnType<RecordType>[]
  data?: RecordType[]
  loading?: boolean
  rowKey?: string
}

const Table: FC<TableProps> = ({ columns, data, loading, rowKey }) => {
  const deviceSize = useDeviceSize();

  return (
    <TableWrapper>
      {deviceSize !== DeviceSize.sm && (
        <RCTable
          columns={columns}
          data={!loading ? data : []}
          emptyText={!loading ? 'No data' : <LoadingComponent />}
          rowKey={rowKey}
        />
      )}
      {deviceSize === DeviceSize.sm && (
        <MobileTable
          columns={columns}
          data={!loading ? data : []}
          loading={loading}
          rowKey={rowKey}
        />
      )}
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
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
        border-bottom: 1px dashed #D2D3D6;
        color: var(--grey-600);
        .unique-text[class^="primary-"], .unique-text[class*="secondary-"] {
          color: var(--grey-600);
        }
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

export default Table;
