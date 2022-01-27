import React, { FC } from 'react';
import { ColumnType, DefaultRecordType } from 'rc-table/lib/interface';
import RCTable from 'rc-table';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';
import useDeviceSize, { DeviceSize } from '../hooks/useDeviceSize';
import LoadingComponent from './LoadingComponent';

interface TableProps<RecordType = DefaultRecordType> {
  className?: string
  columns?: ColumnType<RecordType>[]
  data?: RecordType[]
  loading?: boolean
  rowKey?: string
}

const Table: FC<TableProps> = ({
  className, columns, data, loading, rowKey
}) => {
  const deviceSize = useDeviceSize();

  return (
    <div className={className}>
      {deviceSize !== DeviceSize.sm && (
        <RCTable
          columns={columns}
          data={!loading ? data : []}
          emptyText={!loading ? 'No data' : <LoadingComponent />}
          rowKey={rowKey}
        />
      )}
      {deviceSize === DeviceSize.sm && (
        <div className={'table-sm'}>
          {loading && <LoadingComponent />}
          {!loading && data?.length === 0 && <Text className={'text_grey'}>No data</Text>}
          {!loading &&
            data?.map((item, index) => (
              <div
                className={'row'}
                key={item[rowKey as keyof DefaultRecordType]}
              >
                {columns?.map((column) => (
                  <div key={`column-${column.key || ''}`}>
                    <Text color={'grey-500'}>{`${column?.title || ''}`}</Text>
                    {column.render && <>{column.render(item[column.dataIndex as keyof DefaultRecordType], item, index)}</>}
                    {!column.render && <Text>{item[column.dataIndex as keyof DefaultRecordType]?.toString() || ''}</Text>}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default styled(Table)`
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

    .table-sm {
      margin: var(--gap) 0;
      .row {
        border-bottom: 1px dashed #D2D3D6;
        div {
          margin: var(--gap) 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .title {
          color: var(--blue-gray-600);
        }
      }
    }
  }
`;
