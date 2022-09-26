import { FC, useEffect, useState } from 'react';
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

const TABLE_GAP = 16;

const ScrollableTable: FC<TableProps> = ({ columns, data, loading, rowKey }) => {
  //for sticky first column
  const minTableWidth = columns?.reduce((accum, item) => {
    return accum + Number(item.width);
  }, 0);
  const paddings = columns!.length * TABLE_GAP * 2;
  const margins = columns!.length * (TABLE_GAP / 2);
  const minScreenWidthForTable = (minTableWidth || 500) + paddings + margins;
  const scrollExist = window.innerWidth < minScreenWidthForTable;

  // for shadow by first column
  // todo: (https://cryptousetech.atlassian.net/browse/SCAN-431) to get away from using 'getElementsByTagName' in favor of 'ref'
  const widthOfFirstColumn = document?.getElementsByTagName('th')[0]?.clientWidth;

  // for muted strip at the end of the table
  const [scrollEnded, setScrollEnded] = useState<boolean>(false);
  const [offsetExist, setOffsetExist] = useState<boolean>(false);

  useEffect(() => {
    const tableContent = document.getElementById('tableContent');
    const tableWrapper = document.getElementById('tableWrapper');
    function handlerScroll() {
      setScrollEnded(false);

      if (tableWrapper && tableContent) {
        const scrollLeft = tableWrapper.scrollLeft;
        const scrollableContent = tableWrapper.scrollWidth;
        const accessibleWidth = tableContent.getClientRects()[0].width;

        if (scrollableContent === accessibleWidth + scrollLeft) {
          setScrollEnded(true);
        }

        setOffsetExist(!!scrollLeft);
      }
    }
    tableWrapper?.addEventListener('scroll', handlerScroll);

    return () => {
      tableWrapper?.removeEventListener('scroll', handlerScroll);
    };
  }, []);

  return (
    <ScrollWrapper>
      <TableWrapper id="tableWrapper" minScreenWidthForTable={minScreenWidthForTable}>
        <RCTable
          columns={columns}
          data={data || []}
          emptyText="No data"
          id="tableContent"
          rowKey={rowKey}
        />
        {loading && <TableLoading />}
      </TableWrapper>
      {scrollExist && offsetExist && <ShadowForScroll width={widthOfFirstColumn} />}
      {scrollExist && !scrollEnded && <Mute />}
    </ScrollWrapper>
  );
};

const ScrollWrapper = styled.div`
  position: relative;
`;

const ShadowForScroll = styled.div.attrs<{ width: number }>((props) => ({
  width: props.width,
}))<{ width: number }>`
  position: absolute;
  width: ${(props) => props.width}px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.08);
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
        z-index: 1;
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
