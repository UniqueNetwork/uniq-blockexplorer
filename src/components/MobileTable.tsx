import React, { FC } from 'react';
import { ColumnType, DefaultRecordType } from 'rc-table/lib/interface';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import LoadingComponent from './LoadingComponent';

interface MobileTableProps<RecordType = DefaultRecordType> {
  className?: string
  columns?: ColumnType<RecordType>[]
  data?: RecordType[]
  loading?: boolean
  rowKey?: string
}

const MobileTable: FC<MobileTableProps> = ({
  columns,
  data,
  loading,
  rowKey
}) => {
  let children = <LoadingComponent />;

  if (!loading && data?.length === 0) children = <Text className={'text_grey'}>No data</Text>;
  else if (!loading) {
    children = <>{data?.map((item, index) => (
      <MobileTableRow
        key={item[rowKey as keyof DefaultRecordType]}
      >
        {columns?.map((column) => (
          <div key={`column-${column.key || ''}`}>
            <Text color={'grey-500'}>{`${column?.title || ''}`}</Text>
            {column.render && <>{column.render(item[column.dataIndex as keyof DefaultRecordType], item, index)}</>}
            {!column.render && <Text>{item[column.dataIndex as keyof DefaultRecordType]?.toString() || ''}</Text>}
          </div>
        ))}
      </MobileTableRow>
    ))}</>;
  }

  return (
    <MobileTableWrapper>{children}</MobileTableWrapper>
  );
};

const MobileTableWrapper = styled.div`
  margin: var(--gap) 0;
`;

const MobileTableRow = styled.div`
  border-bottom: 1px dashed var(--border-color);
  div {
    margin: var(--gap) 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default MobileTable;
