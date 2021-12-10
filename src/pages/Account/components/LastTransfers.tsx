import React, { FC, useCallback, useRef } from 'react'
import Table from 'rc-table'
import { useQuery } from '@apollo/client'
import {
  collectionsQuery,
  Data as collectionsData,
  Variables as CollectionsVariables,
} from '../../../api/graphQL/collections'
import { lastTransfersQuery, Data as LastTransfersData, Transfer, Variables as LastTransfersVariables } from '../../../api/graphQL/transfers'
import PaginationComponent from '../../../components/Pagination'

interface LastTransfersProps {
  accountId?: string;
}

const LastTransfers: FC<LastTransfersProps> = (props) => {
  const { accountId } = props;

  const columns = useRef([
    {
      title: 'Extrinsic',
      dataIndex: 'block_index',
      key: 'block_index',
      width: 400,
    },
    { title: 'Age', dataIndex: 'age', key: 'age', width: 10 },
    { title: 'From', dataIndex: 'from_owner', key: 'from_owner', width: 10 },
    { title: 'To', dataIndex: 'to_owner', key: 'to_owner', width: 400 },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', width: 10 },
  ]).current;

  const pageSize = useRef(20).current;

  const {
    fetchMore,
    loading: isTransfersFetching,
    error: fetchTransfersError,
    data: lastTransfers,
  } = useQuery<LastTransfersData, LastTransfersVariables>(lastTransfersQuery, {
    variables: { limit: pageSize, offset: 0 },
  });

  const onPageChange = useCallback((limit: number, offset: number) => {
    fetchMore({variables: {limit, offset}});
  }, []);

  return (
    <>
      <h1>Last  QTZ transfers</h1>
      <Table
        columns={columns}
        data={lastTransfers?.view_last_transfers}
        rowKey={'block_hash'}
      />
      <PaginationComponent
        pageSize={pageSize}
        count={lastTransfers?.view_last_transfers_aggregate?.aggregate?.count || 0}
        onPageChange={onPageChange}
      />
    </>
  )
}

export default React.memo(LastTransfers);
