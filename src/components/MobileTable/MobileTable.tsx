import { FC, useCallback, useState } from 'react';
import { ColumnType, DefaultRecordType, GetRowKey } from 'rc-table/lib/interface';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import { ColumnItem } from './ColumnItem';
import LoadingComponent from '../LoadingComponent';

interface MobileTableProps<RecordType = DefaultRecordType> {
  className?: string;
  columns?: ColumnType<RecordType>[];
  data?: RecordType[];
  loading?: boolean;
  rowKey?: string | GetRowKey<RecordType>;
}

export const MobileTable: FC<MobileTableProps> = ({ columns, data, loading, rowKey }) => {
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const calculateWidth = useCallback(() => {
    const allWidth = columns?.reduce(
      (prev: number, current: ColumnType<DefaultRecordType>) =>
        prev + (current.width as number),
      0,
    ) as number;

    return allWidth - (columns?.[0].width as number);
  }, [columns]);

  const setItemHeight = useCallback(
    (height: number) => {
      if (maxHeight < height) {
        setMaxHeight(height);
      }
    },
    [maxHeight],
  );

  return (
    <MobileTableWrapper>
      {!loading && data?.length === 0 && <Text className="text_grey">No data</Text>}
      {loading && <LoadingComponent />}

      {!!(!loading && data && data?.length > 0) && (
        <MobileTableBody width={columns?.[0].width as number}>
          {!!columns?.[0] && (
            <MobileTableColumnFixed width={columns?.[0].width as number}>
              <>
                {typeof columns?.[0]?.title === 'object' ? (
                  <>{columns?.[0]?.title}</>
                ) : (
                  <Text color="grey-500">{`${columns?.[0]?.title || ''}`}</Text>
                )}
              </>
              {data?.map((item, index) => (
                <MobileTableRow
                  height={maxHeight}
                  key={
                    typeof rowKey === 'function'
                      ? rowKey(item, index)
                      : item[rowKey as keyof DefaultRecordType]
                  }
                >
                  {columns?.map((column, index) => {
                    if (index === 0) {
                      return (
                        <ColumnItem
                          column={column}
                          item={item}
                          index={index}
                          setItemHeight={setItemHeight}
                        />
                      );
                    }
                  })}
                </MobileTableRow>
              ))}
            </MobileTableColumnFixed>
          )}
          <MobileTableScrolledBody>
            <MobileTableColumns
              columnsCount={columns?.length || 0}
              width={calculateWidth()}
            >
              {columns?.map((column, index) => {
                if (index > 0) {
                  return (
                    <MobileTableColumn
                      key={`column-${column.key || ''}`}
                      width={column.width as number}
                    >
                      {typeof column?.title === 'object' ? (
                        <>{column.title}</>
                      ) : (
                        <Text color="grey-500">{`${column?.title || ''}`}</Text>
                      )}
                      {data?.map((item, index) => (
                        <MobileTableRow
                          height={maxHeight}
                          key={
                            typeof rowKey === 'function'
                              ? rowKey(item, index)
                              : item[rowKey as keyof DefaultRecordType]
                          }
                        >
                          {column.render && (
                            <>
                              {column.render(
                                item[column.dataIndex as keyof DefaultRecordType],
                                item,
                                index,
                              )}
                            </>
                          )}
                          {!column.render && (
                            <Text>
                              {item[
                                column.dataIndex as keyof DefaultRecordType
                              ]?.toString() || ''}
                            </Text>
                          )}
                        </MobileTableRow>
                      ))}
                    </MobileTableColumn>
                  );
                }
              })}
            </MobileTableColumns>
          </MobileTableScrolledBody>
        </MobileTableBody>
      )}
    </MobileTableWrapper>
  );
};

const MobileTableWrapper = styled.div``;

const MobileTableBody = styled.div.attrs<{ width: number }>((props) => ({
  width: props.width,
}))<{ width: number }>`
  display: grid;
  grid-template-columns: ${(props) => props.width}px 1fr;
  grid-column-gap: calc(var(--gap) / 2);
  overflow: hidden;
`;

const MobileTableScrolledBody = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
`;

const MobileTableColumns = styled.div.attrs<{ columnsCount: number; width: number }>(
  (props) => ({
    columnsCount: props.columnsCount,
    width: props.width,
  }),
)<{ columnsCount: number; width: number }>`
  display: flex;
  grid-column-gap: calc(var(--gap) / 2);
  width: calc(
    ${(props) => props.width}px + var(--gap) * (${(props) => props.columnsCount} - 1)
  );
`;

const MobileTableColumn = styled.div.attrs<{ width: number }>((props) => ({
  width: props.width,
}))<{ width: number }>`
  width: ${(props) => props.width}px;
  float: left;
  overflow: hidden;
`;

const MobileTableRow = styled.div.attrs<{ height: number }>((props) => ({
  height: props.height,
}))<{ height: number }>`
  height: ${(props) => props.height}px;
`;

const MobileTableColumnFixed = styled.div.attrs<{ width: number }>((props) => ({
  width: props.width,
}))<{ width: number }>`
  width: ${(props) => props.width}px;
`;

export default MobileTable;
